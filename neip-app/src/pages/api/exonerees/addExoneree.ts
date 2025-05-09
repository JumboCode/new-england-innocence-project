import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/database/connectToDb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    personalInfo,
    caseInfo,
    legalInfo,
    wrongfulConvictionInfo,
    postExonerationInfo,
    metaData,
    actorName, 
    actorRole,
  } = req.body;

  if (
    !personalInfo.name || !personalInfo.dateOfBirth || !personalInfo.gender ||
    !personalInfo.race || !personalInfo.ethnicity
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const metaDataInput = metaData.id
      ? {
        connect: { id: metaData.id }, // Connect if ID exists
      }
      : {
        create: metaData, // Create if no ID exists
      };

    const newExoneree = await prisma.exoneree.create({
      data: {
        personalInfo: {
          create: {
            name: personalInfo.name,
            dateOfBirth: personalInfo.dateOfBirth,
            race: personalInfo.race,
            ethnicity: personalInfo.ethnicity,
            gender: personalInfo.gender,
            ...(personalInfo.address && { address: personalInfo.address }),
            ...(personalInfo.email && { email: personalInfo.email }),
            ...(personalInfo.phoneNumber && { phoneNumber: personalInfo.phoneNumber }),
            ...(personalInfo.imageURL && { imageURL: personalInfo.imageURL }),
          }
        },
        ...(caseInfo && { caseInfo: { create: caseInfo } }),
        ...(legalInfo && {
            legalInfo: {
              create: {
                originalCharges: legalInfo.originalCharges,
                convictionMethod: legalInfo.convictionMethod,
                exonerationMethod: legalInfo.exonerationMethod,
                legalRepresentation: legalInfo.legalRepresentation,
                policeDepartment: legalInfo.policeDepartment,
                prosecutor: legalInfo.prosecutor,
                judge: legalInfo.judge,
                officersInvolved: legalInfo.officersInvolved
              }
            }
          }),          
        ...(wrongfulConvictionInfo && { wrongfulConvictionInfo: { create: wrongfulConvictionInfo } }),
        ...(postExonerationInfo && { postExonerationInfo: { create: postExonerationInfo } }),
        ...(metaDataInput && { metaData: metaDataInput }),
      }
    });

    console.log("IN ADD EXONEREE")
    console.log(actorName)

    // Build URL for sub-endpoint calls.
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const host = req.headers.host || 'localhost:3000'
    const baseUrl = `${protocol}://${host}`

    // Check for any new officers 
    for (const officer of legalInfo.officersInvolved) {
    // legalInfo.officersInvolved.forEach(async (officer: string) => {
      console.log(`Officer: ${officer}`);

      try { 
        const officerResponse = await fetch(`${baseUrl}/api/officers/getOfficerByName?name=${encodeURIComponent(officer)}`)
        const officerData = await officerResponse.json();
        console.log(`Officer response: ${officerData}`);
        
        if (officerData.error == 'Officer not found') {
          // Add new officer 
          console.log("Adding new officer");
          const [officerName, badgeNumber] = officer.split(':'); // <name>:[badgeNumber]

          console.log("in add exoneree, ")
          console.log(actorName)

          const createOfficerResponse = await fetch(`${baseUrl}/api/officers/addOfficer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: officerName, 
              badgeNumber: badgeNumber,
              notes: '',
              MediaLinks: '',
              department: '', 
              actorName: actorName, 
              actorRole: actorRole,
            })
          });
          const createOfficerData = await createOfficerResponse.json();
          console.log('Officer created:', createOfficerData);
        }
      } catch (err) {
        console.error('Error fetching officer:', err);
      }
    }

    // Log ADD exoneree 
    await fetch(`${baseUrl}/api/logs/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: actorName, 
        role: actorRole,
        action: 'add',
        object: `exoneree ${personalInfo.name}`,
        date: new Date().toISOString(), 
      })
    })

    return res.status(201).json(newExoneree);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    console.log(error);
    return res
      .status(400)
      .json({ error: `Failed to create Exoneree: ${errorMessage}` });
  }
}
