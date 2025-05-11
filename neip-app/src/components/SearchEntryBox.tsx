import React, { useState } from 'react';
import { CgSearch } from 'react-icons/cg';

interface SearchEntryBoxProps {
  setExonerees: (data: any[]) => void;
  loadAllExonerees: () => void; // new prop
}

const SearchEntryBox: React.FC<SearchEntryBoxProps> = ({ setExonerees, loadAllExonerees }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      console.log('❌ Empty search query');
      return;
    }

    try {
      const response = await fetch(
        `/api/exonerees/search?keyword=${encodeURIComponent(query)}`
      );

      if (!response.ok) throw new Error(`Search failed: ${response.status}`);

      const data = await response.json();

      setExonerees(
        data.map((exoneree: any) => ({
          key: exoneree.id,
          name: exoneree.personalInfo?.name || 'N/A',
          dob: exoneree.personalInfo?.dateOfBirth || 'N/A',
          race: exoneree.personalInfo?.race || 'N/A',
          ethnicity: exoneree.personalInfo?.ethnicity || 'N/A',
          phoneNumber: exoneree.personalInfo?.phoneNumber || 'N/A',
          address: exoneree.personalInfo?.address || 'N/A',
          email: exoneree.personalInfo?.email || 'N/A',
          imageURL: exoneree.personalInfo?.imageURL || 'N/A',
          caseNumber: exoneree.caseInfo?.caseNumber || 'N/A',
          crimeType: exoneree.caseInfo?.crimeType || 'N/A',
          gender: exoneree.personalInfo?.gender || 'N/A',
          jurisdiction: exoneree.caseInfo?.jurisdiction || 'N/A',
          exonerationNumber: exoneree.caseInfo?.exonerationNumber || 'N/A',
          yearsInPrison: exoneree.caseInfo?.yearsInPrison || 'N/A',
          arrestDate: exoneree.caseInfo?.arrestDate || 'N/A',
          convictionDate: exoneree.caseInfo?.convictionDate || 'N/A',
          freedomDate: exoneree.caseInfo?.freedomDate || 'N/A',
          exonerationDate: exoneree.caseInfo?.exonerationDate || 'N/A',
          sentence: exoneree.caseInfo?.sentence || 'N/A',
          originalCharges: exoneree.legalInfo?.originalCharges?.join(', ') || 'N/A',
          convictionMethod: exoneree.legalInfo?.convictionMethod || 'N/A',
          exonerationMethod: exoneree.legalInfo?.exonerationMethod || 'N/A',
          legalRepresentation: exoneree.legalInfo?.legalRepresentation || 'N/A',
          prosecutor: exoneree.legalInfo?.prosecutor || 'N/A',
          judge: exoneree.legalInfo?.judge || 'N/A',
          officersInvolved: exoneree.legalInfo?.officersInvolved?.join(', ') || 'N/A',
          falseConfession: exoneree.wrongfulConvictionInfo?.falseConfession ? 'Yes' : 'No',
          eyewitnessMisidentification: exoneree.wrongfulConvictionInfo?.eyewitnessMisidentification ? 'Yes' : 'No',
          inadequateLegalDefense: exoneree.wrongfulConvictionInfo?.inadequateLegalDefense ? 'Yes' : 'No',
          policeMisconduct: exoneree.wrongfulConvictionInfo?.policeMisconduct ? 'Yes' : 'No',
          prosecutorialMisconduct: exoneree.wrongfulConvictionInfo?.prosecutorialMisconduct ? 'Yes' : 'No',
          forensicEvidence: exoneree.wrongfulConvictionInfo?.forensicEvidence ? 'Yes' : 'No',
          informantTestimony: exoneree.wrongfulConvictionInfo?.informantTestimony ? 'Yes' : 'No',
          otherInfo: exoneree.wrongfulConvictionInfo?.otherInfo || 'N/A',
          compensation: `$${exoneree.postExonerationInfo?.compensationAmount || 0}`,
          reentrySupport: exoneree.postExonerationInfo?.reentrySupport || 'N/A',
          publicApology: exoneree.postExonerationInfo?.publicApology ? 'Yes' : 'No',
          currentStatus: exoneree.postExonerationInfo?.occupation || 'N/A',
          mediaCoverage: exoneree.metaData?.mediaCoverage || 'N/A',
          advocacyInvolvement: exoneree.metaData?.advocacyInvolvement ? 'Yes' : 'No',
          educationalBackground: exoneree.personalInfo?.educationalBackground || 'N/A',
          healthInfo: exoneree.personalInfo?.healthInfo || 'N/A',
          dataSource: exoneree.metaData?.dataSource || 'N/A',
          lastUpdated: exoneree.metaData?.lastUpdated || 'N/A',
          createdAt: exoneree.metaData?.createdAt || 'N/A'
        }))
      );
    } catch (error) {
      console.error('❌ Error fetching search results:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
    loadAllExonerees();
  };

  return (
    <div style={containerStyle}>
      <input
        type='text'
        placeholder='Search exonerees...'
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={inputStyle}
      />
      <CgSearch style={iconStyle} onClick={handleSearch} />
      {query && (
        <button style={clearButtonStyle} onClick={clearSearch}>
          ✕
        </button>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #D0D5DD',
  borderRadius: '8px',
  padding: '8px 12px',
  width: '300px',
  backgroundColor: '#FFFFFF'
};

const inputStyle: React.CSSProperties = {
  border: 'none',
  color: '#111928',
  outline: 'none',
  width: '100%',
  fontSize: '14px'
};

const iconStyle: React.CSSProperties = {
  color: '#667085',
  fontSize: '20px',
  cursor: 'pointer'
};

const clearButtonStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: '#888',
  cursor: 'pointer',
  fontSize: '16px',
  marginLeft: '5px'
};

export default SearchEntryBox;
