export default {
    firstNameRules: [
        (val) => !!val || 'First name is required',
        (val) => /^[A-ZČĆŠĐŽ][a-zčćšđž]*$/.test(val) || 'First name must start with a capital letter'
    ],
    lastNameRules: [
        (val) => !!val || 'Last name is required',
        (val) => /^[A-ZČĆŠĐŽ][a-zčćšđž]*$/.test(val) || 'Last name must start with a capital letter'
    ],
    genderRules: [(val) => !!val || 'Gender is required'],
    vatNumberRules: [(val) => !!val || 'VAT number is required'],
    dateOfBirthRules: [
        (val) => !!val || 'Date of birth is required',
        (val) => {
            if (!val) return true;
            const currentDate = new Date();
            const birthDate = new Date(val);
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            const isOlderThan18 = age > 18 || (age === 18 && birthDate.getMonth() < currentDate.getMonth());
            return isOlderThan18 || 'You must be older than 18 or exactly 18 years old';
        }
    ],
    phoneNumberRules: [
        (val) => !!val || 'Phone number is required',
        (val) => /^\(\d{3}\)\s\d{3}\s-\s\d{4}$/.test(val) || 'Invalid phone number'
    ],
    countryRules: [(val) => !!val || 'Country is required'],
    cityRules: [(val) => !!val || 'City is required'],
    addressRules: [(val) => !!val || 'Address is required'],
    postalCodeRules: [
        (val) => !!val || 'Postal code is required',
        (val) => /^\d{5,9}$/.test(val) || 'ZIP / Postal Code must be between 5 and 9 digits'
    ],
    documentTypeRules: [(val) => !!val || 'Document type is required'],
    documentNumberRules: [(val) => !!val || 'Document number is required'],
    emailRules: [(val) => !!val || 'Email is required', (val) => /.+@.+\..+/.test(val) || 'Invalid email'],
    passwordRules: [
        (val) => !!val || 'Password is required',
        (val) => val.length >= 6 || 'Password must be at least 6 characters long'
    ],
    companyNameRules: [
        (val) => !!val || 'Company name is required',
        (val) => /^[A-Za-zČĆŠĐŽčćšđž][A-Za-zČĆŠĐŽčćšđž0-9\s\.\,\&\-\']*$/.test(val) || 'Invalid company name'
    ]
};
