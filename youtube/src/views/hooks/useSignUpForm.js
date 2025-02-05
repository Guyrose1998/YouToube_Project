import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fieldsData from '../../data/signUpFields.json';
import { isPasswordValid } from '../../utils/validation';
import { handleInputChange, handleImageChange as handleImageChangeUtil } from '../../utils/formHandlers';

const useSignUpForm = (users, setUsers) => {
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        image: null
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setFields(fieldsData.fields);
    }, []);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
                navigate('/');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password, confirmPassword, image, firstName, lastName } = formData;

        if (!username) {
            setError('Username is required.');
            return;
        }

        if (!password) {
            setError('Password is required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (!isPasswordValid(password)) {
            setError('Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.');
            return;
        }

        if (!image) {
            setError('Image is required.');
            return;
        }

        if (users.some(user => user.username === username)) {
            setError('Username already exists.');
            return;
        }

        const newUser = { username, password, firstName, lastName, image };
        setUsers([...users, newUser]);

        setSuccess(true);
        setError('');
    };

    return {
        fields,
        formData,
        error,
        success,
        handleInputChange: (e) => handleInputChange(e, formData, setFormData),
        handleImageChange: (e) => handleImageChangeUtil(e, formData, setFormData, setError),
        handleSubmit
    };
};

export default useSignUpForm;
