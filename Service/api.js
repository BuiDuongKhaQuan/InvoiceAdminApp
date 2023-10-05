import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://bill-rest.ap-southeast-2.elasticbeanstalk.com/api',
    baseURL: 'http://192.168.1.45:8080/api',
});

// Auth
export const login = async (email, password) => {
    try {
        const response = await instance.post('/v1/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const register = async (name, email, password, gender, phone, address, role, companyKey) => {
    try {
        const response = await instance.post('/v1/auth/register', {
            name,
            email,
            password,
            gender,
            phone,
            address,
            role,
            companyKey,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const forgotPassword = async (email) => {
    try {
        const response = await instance.post('/v1/auth/forgotPassword', {
            email,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const validateReset = async (email, otp) => {
    try {
        const response = await instance.post('/v1/auth/validateRegister', {
            email,
            otp,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const validateRegister = async (email, otp) => {
    try {
        const response = await instance.post('/v1/auth/validateRegister', {
            email,
            otp,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//user
export const getUserByEmail = async (email) => {
    try {
        const response = await instance.get(`/v1/auth/users?email=${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getUserByStatus = async (status) => {
    try {
        const response = await instance.get(`/v1/auth/users?status=${status}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAllUser = async () => {
    try {
        const response = await instance.get('/v1/auth/users');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateUser = async (id, name, role, address, gender, phone, status) => {
    let formData = new FormData();
    formData.append('id', id);
    if (name) {
        formData.append('name', name);
    }
    if (role) {
        formData.append('role', role);
    }
    if (address) {
        formData.append('address', address);
    }
    if (gender) {
        formData.append('gender', gender);
    }
    if (phone) {
        formData.append('phone', phone);
    }
    if (status) {
        formData.append('status', status);
    }

    try {
        const response = await instance.patch('/v1/auth/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteUser = async (id) => {
    try {
        const response = await instance.delete(`/v1/auth/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
//reset password
export const resetPassword = async (email, password, retypePassword) => {
    try {
        const response = await instance.post('/v1/auth/resetPassword', {
            email,
            password,
            retypePassword,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
//change password
export const changePassword = async (email, oldPassword, password, retypePassword) => {
    try {
        const response = await instance.post('/v1/auth/changePassword', {
            email,
            oldPassword,
            password,
            retypePassword,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
// companies
export const companies = async (name, logo, status) => {
    try {
        const response = await instance.post('/v1/companies', {
            name,
            logo,
            status,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getCompaniesById = async (id) => {
    try {
        const response = await instance.get(`/v1/companies/id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getCompaniesByName = async (name) => {
    try {
        const response = await instance.get(`/v1/companies?name=${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getCompaniesByStatus = async (status) => {
    try {
        const response = await instance.get(`/v1/companies?status=${status}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAllCompanies = async () => {
    try {
        const response = await instance.get(`/v1/companies`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateCompany = async (id, name, logo, status, email, address, phone) => {
    let formData = new FormData();
    formData.append('id', id);
    if (name) {
        formData.append('name', name);
    }
    if (address) {
        formData.append('address', address);
    }
    if (email) {
        formData.append('email', email);
    }
    if (phone) {
        formData.append('phone', phone);
    }
    if (status) {
        formData.append('status', status);
    }
    if (logo) {
        let filename = logo.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append('logo', {
            uri: logo,
            name: filename,
            type,
        });
    }
    try {
        const response = await instance.patch('/v1/companies', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createCompany = async (name, logo, status, email, address, phone) => {
    let formData = new FormData();
    if (name) {
        formData.append('name', name);
    }
    if (address) {
        formData.append('address', address);
    }
    if (email) {
        formData.append('email', email);
    }
    if (phone) {
        formData.append('phone', phone);
    }
    if (status) {
        formData.append('status', status);
    }
    if (logo) {
        let filename = logo.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append('logo', {
            uri: logo,
            name: filename,
            type,
        });
    }
    try {
        const response = await instance.post('/v1/companies', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
//invoice
export const invoices = async (emailUser, emailGuest, note, isPaid, listOrders, method, companyName, key, qrImage) => {
    try {
        const response = await instance.post('v1/invoices', {
            emailUser,
            emailGuest,
            note,
            isPaid,
            listOrders,
            method,
            companyName,
            key,
            qrImage,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAllInvoice = async () => {
    try {
        const response = await instance.get('/v1/invoices');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getInvoiceByCompanyName = async (name) => {
    try {
        const response = await instance.get(`/v1/invoices?companyName=${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteInvoiceById = async (id) => {
    console.log(id);
    try {
        const response = await axios.delete(`http://192.168.1.85:8080/api/v1/invoices/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//products
export const products = async (name, status, price, listImageFile, companyName, description, type) => {
    try {
        const response = await instance.post('v1/products', {
            name,
            status,
            price,
            listImageFile,
            companyName,
            description,
            type,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAllProduct = async () => {
    try {
        const response = await instance.get('/v1/products');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getProductByName = async (name) => {
    try {
        const response = await instance.get(`/v1/products?name=${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updateProduct = async (id, name, status, price, description, type, images) => {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('status', status);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('type', type);
    if (images && images.length > 0) {
        images.forEach((image, index) => {
            let filename = image.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            formData.append(`listImageFile[${index}]`, {
                uri: image,
                name: filename,
                type,
            });
        });
    }
    console.log(formData);
    try {
        const response = await instance.patch('/v1/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
// update
export const updateStatus = async (id, status) => {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);
    try {
        const response = await instance.patch(`/v1/auth/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteCompany = async (id) => {
    try {
        const response = await instance.delete(`/v1/companies/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
