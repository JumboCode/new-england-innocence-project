import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Prisma CRUD operations', () => {
  // Connect to db before running tests
  beforeAll(async () => {
    await prisma.$connect()
  })

  // Disconnect from db
  afterAll(async () => {
    await prisma.$disconnect()
  })

  test('Create and retrieve an exoneree', async () => {
    // Create required related records

    // Create PersonalInfo
    const personalInfo = await prisma.personalInfo.create({
      data: {
        name: 'Jane Doe',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'F',
        race: 'Caucasian',
        ethnicity: 'American',
        phoneNumber: '1234567890',
        address: '123 Main St, Springfield, MA',
        email: 'jane.doe@example.com'
      }
    })

    // Create CaseInfo
    const caseInfo = await prisma.caseInfo.create({
      data: {
        caseNumber: '654321',
        jurisdiction: {
          create: {
            state: 'MA',
            country: 'USA'
          }
        },
        yearsInPrison: 5,
        arrestDate: new Date('2015-01-01'),
        convictionDate: new Date('2016-01-01'),
        freedomDate: new Date('2020-01-01'),
        exonerationDate: new Date('2020-06-01'),
        crimeType: 'Fraud',
        sentence: '5 years'
      }
    })

    // Create LegalInfo
    const legalInfo = await prisma.legalInfo.create({
      data: {
        originalCharges: 'Fraud',
        convictionMethod: ['Trial'],
        exonerationMethod: ['New Evidence'],
        legalRepresentation: 'Private Lawyer',
        prosecutor: 'Tom Smith',
        judge: 'Joe Smith',
        officersInvolved: ['officer B']
      }
    })

    // Create WrongfulConvictionInfo
    const wrongfulConvictionInfo = await prisma.wrongfulConvictionInfo.create({
      data: {
        falseConfession: false,
        eyewitnessMisidentification: false,
        inadequateLegalDefense: true,
        policeMisconduct: false,
        prosecutorialMisconduct: false,
        forensicEvidence: true,
        informantTestimony: false
        otherInfo: ""
      }
    })

    // Create Compensation
    const compensation = await prisma.compensation.create({
      data: {
        amount: 50000,
        Date: new Date()
      }
    })

    // Create CurrentStatus
    const currentStatus = await prisma.currentStatus.create({
      data: {
        occupation: 'Activist',
        residence: {
          create: {
            state: 'MA',
            country: 'USA'
          }
        }
      }
    })

    // Create PostExonerationInfo
    const postExonerationInfo = await prisma.postExonerationInfo.create({
      data: {
        compensationId: compensation.id,
        reentrySupport: [],
        publicApology: true,
        currentStatusId: currentStatus.id
      }
    })

    // Create MetaData
    const metaData = await prisma.metaData.create({
      data: {
        dataSource: 'Test Data',
        lastUpdated: new Date(),
        createdAt: new Date()
      }
    })

    // Create Exoneree
    const user = await prisma.exoneree.create({
      data: {
        personalInfoId: personalInfo.id,
        caseInfoId: caseInfo.id,
        legalInfoId: legalInfo.id,
        wrongfulConvictionInfoId: wrongfulConvictionInfo.id,
        postExonerationInfoId: postExonerationInfo.id,
        metaDataId: metaData.id // Use the created metaData ID here
      }
    })

    expect(user).toBeDefined()

    // Retrieve the user
    const foundUser = await prisma.exoneree.findUnique({
      where: { id: user.id }
    })

    expect(foundUser).toMatchObject(user)

    // Clean up by deleting the user and related records
    await prisma.exoneree.delete({ where: { id: user.id } })
    await prisma.postExonerationInfo.delete({
      where: { id: postExonerationInfo.id }
    })
    await prisma.currentStatus.delete({ where: { id: currentStatus.id } })
    await prisma.compensation.delete({ where: { id: compensation.id } })
    await prisma.wrongfulConvictionInfo.delete({
      where: { id: wrongfulConvictionInfo.id }
    })
    await prisma.legalInfo.delete({ where: { id: legalInfo.id } })
    await prisma.caseInfo.delete({ where: { id: caseInfo.id } })
    await prisma.personalInfo.delete({ where: { id: personalInfo.id } })
    await prisma.metaData.delete({ where: { id: metaData.id } })
  })
})
