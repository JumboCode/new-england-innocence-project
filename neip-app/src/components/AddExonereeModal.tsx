// AddExonereeModal.tsx
import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LabelAndEntry from './LabelAndEntry'
import LabelAndDropdown from './LabelAndDropdown'
import DropdownAndTags from '../components/DropdownAndTags'
import PersonalInfoIcon from '../img/PersonalInfoIcon.png'
import IconTextButton from '../components/IconTextButton'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 1300
}

interface AddExonereeModalProps {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const AddExonereeModal: React.FC<AddExonereeModalProps> = ({
  open,
  handleClose,
  onSuccess
}) => {
  const { user } = useUser(); 
  
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dob: '',
    gender: '',
    race: '',
    ethnicity: '',
    address: '',
    imageUrl: '',
    caseNumber: '',
    jurisdiction: '',
    exonerationNumber: '',
    yearsInPrison: '',
    arrestDate: '',
    convictionDate: '',
    freedomDate: '',
    exonerationDate: '',
    crimeType: '',
    sentence: '',
    country: '',
    state: '',
    originalCharges: [],
    convictionMethod: '',
    exonerationMethod: '',
    policeDepartment: '',
    legalRepresentation: '',
    prosecutor: '',
    judge: '',
    officersInvolved: [],
    falseConfession: '',
    eyewitnessMisidentification: '',
    inadequateLegalDefense: '',
    policeMisconduct: '',
    prosecutorialMisconduct: '',
    forensicEvidence: '',
    informantTestimony: '',
    otherInfo: '',
    compensationAmount: '',
    compensationDate: '',
    reentrySupport: '',
    publicApology: '',
    currentCountry: '',
    currentState: '',
    currentStatus: '',
    currentOccupation: '',
    placeOfResidence: '',
    mediaCoverage: '',
    advocacyInvolvement: '',
    educationalBackground: '',
    healthInfo: ''
  })

  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (open) {
      setActiveTab(0)
    }
  }, [open])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const tabSx = (tabIndex: number) => ({
    fontSize: '12px',
    fontFamily: 'Arial, sans-serif',
    textTransform: 'none',
    color: activeTab === tabIndex ? 'white' : 'black',
    backgroundColor: activeTab === tabIndex ? '#6AA9F9' : 'white',
    padding: '5px 10px 5px 12px',
    border: 'none',
    borderRadius: '28px',
    gap: '4px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
      backgroundColor: activeTab === tabIndex ? '#6AA9F9' : '#E3F2FD'
    },
    '&.Mui-selected': {
      color: 'white'
    }
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    value?: string[]
  ) => {
    if (Array.isArray(value)) {
      setFormData(prevData => ({
        ...prevData,
        [e as string]: value
      }))
    } else if (
      (e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>).target
    ) {
      const event = e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      setFormData(prevData => ({
        ...prevData,
        [event.target.name]: event.target.value
      }))
    }
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const form = new FormData()
    form.append('image', file)

    try {
      const res = await fetch('/api/exonerees/uploadImage', {
        method: 'POST',
        body: form
      })

      const data = await res.json()
      if (res.ok && data.imageUrl) {
        setFormData(prev => ({
          ...prev,
          imageUrl: data.imageUrl
        }))
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (err) {
      console.error('Image upload error:', err)
      alert('Image upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      // Restructure the form data into the expected format
      const formattedData = {
        personalInfo: {
          name: formData.firstName + ' ' + formData.lastName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          dateOfBirth: formData.dob,
          gender:
            formData.gender === 'Male'
              ? 'M'
              : formData.gender === 'Female'
              ? 'F'
              : 'OTHER',
          race: formData.race,
          ethnicity: formData.ethnicity,
          address: formData.address,
          imageURL: formData.imageUrl
        },
        caseInfo: {
          caseNumber: formData.caseNumber,
          jurisdiction: formData.jurisdiction,
          exonerationNumber: parseInt(formData.exonerationNumber) || 0,
          yearsInPrison: parseInt(formData.yearsInPrison) || 0,
          arrestDate: formData.arrestDate,
          convictionDate: formData.convictionDate,
          freedomDate: formData.freedomDate,
          exonerationDate: formData.exonerationDate,
          crimeType: formData.crimeType,
          sentence: formData.sentence,
          country: formData.country,
          state: formData.state
        },
        legalInfo: {
          originalCharges: formData.originalCharges,
          convictionMethod: formData.convictionMethod,
          exonerationMethod: formData.exonerationMethod,
          legalRepresentation: formData.legalRepresentation,
          policeDepartment: formData.policeDepartment,
          prosecutor: formData.prosecutor,
          judge: formData.judge,
          officersInvolved: formData.officersInvolved
        },
        wrongfulConvictionInfo: {
          falseConfession: formData.falseConfession === 'No' ? false : true, // defaults to Yes
          eyewitnessMisidentification:
            formData.eyewitnessMisidentification === 'No' ? false : true,
          inadequateLegalDefense: formData.inadequateLegalDefense === 'No' ? false : true,
          policeMisconduct: formData.policeMisconduct === 'No' ? false : true,
          prosecutorialMisconduct: formData.prosecutorialMisconduct === 'No' ? false : true,
          forensicEvidence: formData.forensicEvidence === 'No' ? false : true,
          informantTestimony:
            formData.informantTestimony === 'No' ? false : true,
          otherInfo: formData.otherInfo
        },
        postExonerationInfo: {
          compensationAmount: parseFloat(formData.compensationAmount) || 0,
          compensationDate: formData.compensationDate,
          reentrySupport: formData.reentrySupport,
          publicApology: formData.publicApology === 'Yes',
          currentCountry: formData.currentCountry,
          currentState: formData.currentState,
          occupation: formData.currentOccupation
        },
        additionalInfo: {
          mediaCoverage: formData.mediaCoverage,
          advocacyInvolvement: formData.advocacyInvolvement,
          educationalBackground: formData.educationalBackground,
          healthInformation: formData.healthInfo,
          id: 0 // This will be replaced by the actual ID if it exists
        },
        metaData: {
          dataSource: '',
          lastUpdated: new Date().toLocaleDateString('en-US'),
          createdAt: new Date().toLocaleDateString('en-US')
        }, 
        actorName: user?.fullName || user?.emailAddresses[0].emailAddress,
        actorRole: user?.publicMetadata?.role,
      }

      // Basic validation
      if (
        !formattedData.personalInfo.name ||
        !formattedData.personalInfo.dateOfBirth ||
        !formattedData.personalInfo.gender ||
        !formattedData.personalInfo.race ||
        !formattedData.personalInfo.ethnicity
      ) {
        alert('Required fields are missing')
        return
      }

      console.log('Submitting officersInvolved:', formData.officersInvolved)
      console.log('Type of officersInvolved:', typeof formData.officersInvolved)

      const response = await fetch('/api/exonerees/addExoneree', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        )
      }

      const result = await response.json()
      console.log('Successfully added exoneree:', result)

      // Call onSuccess to refresh parent data before closing the modal.
      onSuccess()

      // Close the modal and reset form
      handleClose()
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        dob: '',
        gender: '',
        race: '',
        ethnicity: '',
        address: '',
        imageUrl: '',
        caseNumber: '',
        jurisdiction: '',
        exonerationNumber: '',
        yearsInPrison: '',
        arrestDate: '',
        convictionDate: '',
        freedomDate: '',
        exonerationDate: '',
        crimeType: '',
        sentence: '',
        country: '',
        state: '',
        originalCharges: [],
        convictionMethod: '',
        exonerationMethod: '',
        policeDepartment: '',
        legalRepresentation: '',
        prosecutor: '',
        judge: '',
        officersInvolved: [],
        falseConfession: '',
        eyewitnessMisidentification: '',
        inadequateLegalDefense: '',
        policeMisconduct: '',
        prosecutorialMisconduct: '',
        forensicEvidence: '',
        informantTestimony: '',
        otherInfo: '',
        compensationAmount: '',
        compensationDate: '',
        reentrySupport: '',
        publicApology: '',
        currentCountry: '',
        currentState: '',
        currentStatus: '',
        currentOccupation: '',
        placeOfResidence: '',
        mediaCoverage: '',
        advocacyInvolvement: '',
        educationalBackground: '',
        healthInfo: ''
      })
    } catch (error) {
      console.error('Error adding exoneree:', error)
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to add exoneree. Please try again.'
      )
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        const personalLeftIcons = [
          <React.Fragment key='upload-image-section'>
            <div style={{ marginBottom: '12px' }}>
              {isUploading ? (
                <p>Uploading...</p>
              ) : (
                <div
                  style={{
                    padding: '5px',
                    position: 'relative',
                    width: '50%',
                    height: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={
                      formData.imageUrl
                        ? `/api/exonerees/imageProxy?key=${encodeURIComponent(
                            formData.imageUrl.split('/').pop() || ''
                          )}`
                        : PersonalInfoIcon.src
                    }
                    alt='Profile Picture'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                </div>
              )}
            </div>
            <label
              style={{
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                display: 'block',
                color: 'rgb(102, 112, 133)'
              }}
            >
              Image Upload
            </label>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              style={{ marginTop: '5px', marginBottom: '10px' }}
            />
          </React.Fragment>,
          <React.Fragment key='first-name-entry'>
            <LabelAndEntry
              label={'First Name*'}
              placeholder={''}
              width='40%'
              height='35px'
              borderRadius='10px'
              value={formData.firstName}
              onChange={handleChange}
              name='firstName'
            />
          </React.Fragment>,
          <React.Fragment key='last-name-entry'>
            <LabelAndEntry
              label={'Last Name*'}
              placeholder={''}
              width='40%'
              height='35px'
              borderRadius='10px'
              value={formData.lastName}
              onChange={handleChange}
              name='lastName'
            />
          </React.Fragment>,
          <React.Fragment key='phone-number-entry'>
            <LabelAndEntry
              label={'Phone Number*'}
              placeholder={''}
              width='40%'
              height='35px'
              borderRadius='10px'
              value={formData.phoneNumber}
              onChange={handleChange}
              name='phoneNumber'
            />
          </React.Fragment>
        ]

        const personalRightIcons = [
          <React.Fragment key='email-entry'>
            <LabelAndEntry
              label={'Email'}
              placeholder={''}
              width='40%'
              height='35px'
              borderRadius='10px'
              value={formData.email}
              onChange={handleChange}
              name='email'
            />
          </React.Fragment>,
          <React.Fragment key='dob-entry'>
            <LabelAndEntry
              label={'Date of Birth*'}
              placeholder={'xx/xx/xxxx'}
              width='48%'
              height='36px'
              borderRadius='10px'
              value={formData.dob}
              onChange={handleChange}
              name='dob'
            />
          </React.Fragment>,
          <React.Fragment key='gender-dropdown'>
            <LabelAndDropdown
              label={'Gender*'}
              dropdownOptions={['Male', 'Female']}
              placeholder={'Gender'}
              width='210px'
              value={formData.gender}
              onChange={handleChange}
              name='gender'
            />
          </React.Fragment>,
          <React.Fragment key='race-dropdown'>
            <LabelAndDropdown
              label={'Race*'}
              dropdownOptions={[
                'White',
                'Black',
                'Asian',
                'Hispanic or Latino',
                'American Indian or Alaska Native',
                'Native Hawaiian or Pacific Islander'
              ]}
              placeholder={'Race'}
              width='210px'
              value={formData.race}
              onChange={handleChange}
              name='race'
            />
          </React.Fragment>,
          <React.Fragment key='ethnicity-dropdown'>
            <LabelAndDropdown
              label={'Ethnicity*'}
              dropdownOptions={[
                'American Indian/Alaska Native',
                'Asian',
                'Black',
                'Hispanic or Latino',
                'Middle Eastern or North African',
                'White/European'
              ]}
              placeholder={'Ethnicity'}
              width='210px'
              value={formData.ethnicity}
              onChange={handleChange}
              name='ethnicity'
            />
          </React.Fragment>,
          <React.Fragment key='address-entry'>
            <LabelAndEntry
              label={'Address*'}
              width='48%'
              height='72px'
              borderRadius='10px'
              value={formData.address}
              onChange={handleChange}
              name='address'
            />
          </React.Fragment>
        ]

        return (
          <div>
            <div
              style={{
                display: 'flex',
                marginTop: '50px',
                marginRight: '10px',
                marginLeft: '100px'
              }}
            >
              {/* Left Column */}
              <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
                {personalLeftIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
              {/* Right Column */}
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {personalRightIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 1:
        const caseLeftIcons = [
          <React.Fragment key='case-number'>
            <LabelAndEntry
              label={'Case Number*'}
              placeholder={'XXXXXXXXXXXX'}
              width='60%'
              height='35px'
              borderRadius='10px'
              value={formData.caseNumber}
              onChange={handleChange}
              name='caseNumber'
            />
          </React.Fragment>,
          <React.Fragment key='exonerationNumber'>
            <LabelAndEntry
              label={'Exoneration Number'}
              placeholder={'XXXXXXXXXXXX'}
              width='60%'
              height='35px'
              borderRadius='10px'
              value={formData.exonerationNumber}
              onChange={handleChange}
              name='exonerationNumber'
            />
          </React.Fragment>,
          <React.Fragment key='jurisdiction'>
            <LabelAndEntry
              label={'Jurisdiction'}
              placeholder={'City, State'}
              width='60%'
              height='35px'
              borderRadius='10px'
              value={formData.jurisdiction}
              onChange={handleChange}
              name='jurisdiction'
            />
          </React.Fragment>,
          <React.Fragment key='years-in-prison'>
            <LabelAndEntry
              label={'Years in Prison'}
              width='60%'
              height='35px'
              borderRadius='10px'
              value={formData.yearsInPrison}
              onChange={handleChange}
              name='yearsInPrison'
            />
          </React.Fragment>,
          <React.Fragment key='arrest-date'>
            <LabelAndEntry
              label={'Arrest Date'}
              placeholder={'XX/XX/XXX'}
              width='60%'
              height='35px'
              borderRadius='10px'
              value={formData.arrestDate}
              onChange={handleChange}
              name='arrestDate'
            />
          </React.Fragment>,
          <React.Fragment key='conviction-date'>
            <LabelAndEntry
              label={'Conviction Date'}
              placeholder={'XX/XX/XXX'}
              width='60%'
              height='35px'
              borderRadius='10px'
              value={formData.convictionDate}
              onChange={handleChange}
              name='convictionDate'
            />
          </React.Fragment>
        ]

        const caseRightIcons = [
          <React.Fragment key='freedom-date'>
            <LabelAndEntry
              label={'Freedom Date'}
              placeholder={'XX/XX/XXX'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.freedomDate}
              onChange={handleChange}
              name='freedomDate'
            />
          </React.Fragment>,
          <React.Fragment key='exoneration-date'>
            <LabelAndEntry
              label={'Exoneration Date'}
              placeholder={'XX/XX/XXX'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.exonerationDate}
              onChange={handleChange}
              name='exonerationDate'
            />
          </React.Fragment>,
          <React.Fragment key='crime-type-dropdown'>
            <LabelAndDropdown
              label={'Crime Type'}
              dropdownOptions={['Felony', 'Misdemeanor']}
              placeholder={'Crime Type'}
              width='265px'
              value={formData.crimeType}
              onChange={handleChange}
              name='crimeType'
            />
          </React.Fragment>,
          <React.Fragment key='sentence-entry'>
            <LabelAndEntry
              label={'Sentence'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.sentence}
              onChange={handleChange}
              name='sentence'
            />
          </React.Fragment>,
          <React.Fragment key='country'>
            <LabelAndEntry
              label={'Country'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.country}
              onChange={handleChange}
              name='country'
            />
          </React.Fragment>,
          <React.Fragment key='state'>
            <LabelAndEntry
              label={'State'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.state}
              onChange={handleChange}
              name='state'
            />
          </React.Fragment>
        ]

        return (
          <div>
            <div
              style={{
                display: 'flex',
                marginTop: '50px',
                marginRight: '10px',
                marginLeft: '100px'
              }}
            >
              {/* Left Column */}
              <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
                {caseLeftIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
              {/* Right Column */}
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {caseRightIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 2:
        const legalLeftIcons = [
          <React.Fragment key='original-charges'>
            <DropdownAndTags
              label={'Original Charges'}
              placeholder={'Charge'}
              options={[]}
              width='60%'
              height='35px'
              value={formData.originalCharges}
              onChange={(name, value) => {
                setFormData(prev => ({
                  ...prev,
                  [name]: value
                }))
              }}
              name='originalCharges'
              apiUrl='Charge'
            />
          </React.Fragment>,
          <React.Fragment key='conviction-method'>
            <LabelAndEntry
              label={'Conviction Method'}
              width='60%'
              height='35px'
              borderRadius='10px'
              value={formData.convictionMethod}
              onChange={handleChange}
              name='convictionMethod'
            />
          </React.Fragment>,
          <React.Fragment key='exoneration-method'>
            <LabelAndEntry
              label={'Exoneration Method'}
              width='60%'
              height='35px'
              borderRadius='10px'
              value={formData.exonerationMethod}
              onChange={handleChange}
              name='exonerationMethod'
            />
          </React.Fragment>,
          <React.Fragment key='policeDept'>
            <LabelAndEntry
              label={'Police Department'}
              width='60%'
              height='35px'
              borderRadius='10px'
              value={formData.policeDepartment}
              onChange={handleChange}
              name='policeDepartment'
            />
          </React.Fragment>
        ]

        const legalRightIcons = [
          <React.Fragment key='legalRepresentation'>
            <LabelAndEntry
              label={'Legal Representation'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.legalRepresentation}
              onChange={handleChange}
              name='legalRepresentation'
            />
          </React.Fragment>,
          <React.Fragment key='prosecutor'>
            <LabelAndEntry
              label={'Prosecutor'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.prosecutor}
              onChange={handleChange}
              name='prosecutor'
            />
          </React.Fragment>,
          <React.Fragment key='judge'>
            <LabelAndEntry
              label={'Judge'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.judge}
              onChange={handleChange}
              name='judge'
            />
          </React.Fragment>,
          <React.Fragment key='officers-involved'>
            <DropdownAndTags
              label={'Officers Involved'}
              placeholder={'Officer'}
              options={[]}
              width='60%'
              height='36px'
              value={formData.officersInvolved}
              onChange={(name, value) => {
                setFormData(prev => ({
                  ...prev,
                  [name]: value
                }))
              }}
              name='officersInvolved'
              apiUrl='Officer'
            />
          </React.Fragment>
        ]

        return (
          <div>
            <div
              style={{
                display: 'flex',
                marginTop: '50px',
                marginRight: '10px',
                marginLeft: '100px'
              }}
            >
              {/* Left Column */}
              <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
                {legalLeftIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
              {/* Right Column */}
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {legalRightIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 3:
        const circumstancesLeftIcons = [
          <React.Fragment key='false-confession'>
            <LabelAndDropdown
              label={'False confession'}
              placeholder={'[Yes/No]'}
              dropdownOptions={['Yes', 'No']}
              width='60%'
              value={formData.falseConfession}
              onChange={handleChange}
              name='falseConfession'
            />
          </React.Fragment>,
          <React.Fragment key='eyewitness-misidentification'>
            <LabelAndDropdown
              label={'Eyewitness misidentification'}
              placeholder={'[Yes/No]'}
              dropdownOptions={['Yes', 'No']}
              width='60%'
              value={formData.eyewitnessMisidentification}
              onChange={handleChange}
              name='eyewitnessMisidentification'
            />
          </React.Fragment>,
          <React.Fragment key='inadequate-legal-defense'>
            <LabelAndDropdown
              label={'Inadequate legal defense'}
              placeholder={'[Yes/No]'}
              dropdownOptions={['Yes', 'No']}
              width='60%'
              value={formData.inadequateLegalDefense}
              onChange={handleChange}
              name='inadequateLegalDefense'
            />
          </React.Fragment>,
          <React.Fragment key='police-misconduct'>
            <LabelAndDropdown
              label={'Police misconduct'}
              placeholder={'[Yes/No]'}
              dropdownOptions={['Yes', 'No']}
              width='60%'
              value={formData.policeMisconduct}
              onChange={handleChange}
              name='policeMisconduct'
            />
          </React.Fragment>,
          <React.Fragment key='prosecutorial-misconduct'>
            <LabelAndDropdown
              label={'Prosecutorial misconduct'}
              placeholder={'[Yes/No]'}
              dropdownOptions={['Yes', 'No']}
              width='60%'
              value={formData.prosecutorialMisconduct}
              onChange={handleChange}
              name='prosecutorialMisconduct'
            />
          </React.Fragment>
        ]

        const circumstancesRightIcons = [
          <React.Fragment key='forensic-evidence'>
            <LabelAndDropdown
              label={'Forensic Evidence'}
              placeholder={'[Yes/No]'}
              dropdownOptions={['Yes', 'No']}
              width='60%'
              value={formData.forensicEvidence}
              onChange={handleChange}
              name='forensicEvidence'
            />
          </React.Fragment>,
          <React.Fragment key='informant-testimony'>
            <LabelAndEntry
              label={'Informant Testimony'}
              width='60%'
              value={formData.informantTestimony}
              onChange={handleChange}
              name='informantTestimony'
            />
          </React.Fragment>,
          <React.Fragment key='other-info'>
            <LabelAndEntry
              label={'Other Info'}
              width='60%'
              value={formData.otherInfo}
              onChange={handleChange}
              name='otherInfo'
            />
          </React.Fragment>
        ]

        return (
          <div>
            <div
              style={{
                display: 'flex',
                marginTop: '50px',
                marginRight: '10px',
                marginLeft: '100px'
              }}
            >
              <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
                {circumstancesLeftIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {circumstancesRightIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        const postexonerationLeftIcons = [
          <React.Fragment key='compensation-amount'>
            <LabelAndEntry
              label={'Compensation'}
              placeholder={'Amount'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.compensationAmount}
              onChange={handleChange}
              name='compensationAmount'
            />
          </React.Fragment>,
          <React.Fragment key='compensation-date'>
            <LabelAndEntry
              label={'Compensation Date'}
              placeholder={'xx/xx/xxxx'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.compensationDate}
              onChange={handleChange}
              name='compensationDate'
            />
          </React.Fragment>,
          <React.Fragment key='reentry-support'>
            <LabelAndDropdown
              label={'Reentry support'}
              placeholder={'[Yes/No]'}
              dropdownOptions={['Yes', 'No']}
              width='60%'
              value={formData.reentrySupport}
              onChange={handleChange}
              name='reentrySupport'
            />
          </React.Fragment>,
          <React.Fragment key='public-apology'>
            <LabelAndDropdown
              label={'Public apology'}
              placeholder={'[Yes/No]'}
              dropdownOptions={['Yes', 'No']}
              width='60%'
              value={formData.publicApology}
              onChange={handleChange}
              name='publicApology'
            />
          </React.Fragment>,
          <React.Fragment key='current-country'>
            <LabelAndEntry
              label={'Current Country'}
              placeholder={''}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.currentCountry}
              onChange={handleChange}
              name='currentCountry'
            />
          </React.Fragment>,
          <React.Fragment key='current-state'>
            <LabelAndEntry
              label={'Current State'}
              placeholder={''}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.currentState}
              onChange={handleChange}
              name='currentState'
            />
          </React.Fragment>,
          <React.Fragment key='current-status'>
            <LabelAndDropdown
              label={'Current status'}
              placeholder={'Select status'}
              dropdownOptions={[
                'Freed but still fighting',
                'Plea deal',
                'Exonerated',
                'Return to custody'
              ]}
              width='60%'
              value={formData.currentStatus}
              onChange={handleChange}
              name='currentStatus'
            />
          </React.Fragment>
        ]

        const postexonerationRightIcons = [
          <React.Fragment key='current-occupation'>
            <LabelAndEntry
              label={'Current occupation'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.currentOccupation}
              onChange={handleChange}
              name='currentOccupation'
            />
          </React.Fragment>,
          <React.Fragment key='place-of-residence'>
            <LabelAndEntry
              label={'Place of residence'}
              placeholder={'Address'}
              width='60%'
              height='72px'
              borderRadius='10px'
              value={formData.placeOfResidence}
              onChange={handleChange}
              name='placeOfResidence'
            />
          </React.Fragment>
        ]

        return (
          <div>
            <div
              style={{
                display: 'flex',
                marginTop: '50px',
                marginRight: '10px',
                marginLeft: '100px'
              }}
            >
              <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
                {postexonerationLeftIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {postexonerationRightIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        const additionalLeftIcons = [
          <React.Fragment key='media-coverage'>
            <LabelAndEntry
              label={'Media coverage'}
              width='60%'
              height='36px'
              borderRadius='10px'
              value={formData.mediaCoverage}
              onChange={handleChange}
              name='mediaCoverage'
            />
          </React.Fragment>,
          <React.Fragment key='advocacy-involvement'>
            <LabelAndEntry
              label={'Advocacy involvement'}
              width='60%'
              height='72px'
              borderRadius='10px'
              value={formData.advocacyInvolvement}
              onChange={handleChange}
              name='advocacyInvolvement'
            />
          </React.Fragment>,
          <React.Fragment key='educational-background'>
            <LabelAndEntry
              label={'Educational background'}
              width='60%'
              height='72px'
              borderRadius='10px'
              value={formData.educationalBackground}
              onChange={handleChange}
              name='educationalBackground'
            />
          </React.Fragment>
        ]

        const additionalRightIcons = [
          <React.Fragment key='health-info'>
            <LabelAndEntry
              label={'Health information'}
              width='60%'
              height='72px'
              borderRadius='10px'
              value={formData.healthInfo}
              onChange={handleChange}
              name='healthInfo'
            />
          </React.Fragment>,
          <React.Fragment key='submit-button'>
            <div
              style={{
                textAlign: 'center',
                marginTop: '30px',
                marginLeft: '50px'
              }}
            >
              <IconTextButton
                filled={true}
                border={false}
                text='Submit'
                height='40px'
                width='106px'
                onClick={handleSubmit}
              />
            </div>
          </React.Fragment>
        ]

        return (
          <div>
            <div
              style={{
                display: 'flex',
                marginTop: '50px',
                marginRight: '10px',
                marginLeft: '100px'
              }}
            >
              <div style={{ flex: 1, marginRight: 'auto', marginLeft: '90px' }}>
                {additionalLeftIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, marginLeft: '10px' }}>
                {additionalRightIcons.map((icon, index) => (
                  <div key={index} style={{ marginBottom: '3px' }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return <div>Personal Info</div>
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='add-exoneree-modal'
    >
      <Box sx={style}>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'grey.500'
          }}
        >
          <CloseIcon />
        </IconButton>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{
            style: { display: 'none' }
          }}
        >
          <Tab sx={tabSx(0)} label='Personal Info' />
          <Tab sx={tabSx(1)} label='Case Info' />
          <Tab sx={tabSx(2)} label='Legal Info' />
          <Tab sx={tabSx(3)} label='Circumstances of Wrongful Conviction' />
          <Tab sx={tabSx(4)} label='Post Exoneration Info' />
          <Tab sx={tabSx(5)} label='Additional Info' />
        </Tabs>

        <Box sx={{ mt: 3 }}>{renderTabContent()}</Box>
      </Box>
    </Modal>
  )
}

export default AddExonereeModal
