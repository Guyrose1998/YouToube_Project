import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginFieldsData from '../../data/loginFields.json';
import { handleInputChange } from '../../utils/formHandlers';

const useLoginForm = (users, onLogin) => {
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setFields(loginFieldsData.fields);
    }, []);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess('');
                navigate('/');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = formData;

        if (!username || !password) {
            setError('Username and password are required.');
            setSuccess('');
            return;
        }

        // Find the user matching the provided username and password
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            setSuccess('Login successful!');
            setError('');
            onLogin(user);  // Call the onLogin callback to update authentication state
        } else {
            setError('Invalid username or password.');
            setSuccess('');
        }
    };

    return {
        fields,
        formData,
        error,
        success,
        handleInputChange: (e) => handleInputChange(e, formData, setFormData),
        handleSubmit
    };
};

export default useLoginForm;
