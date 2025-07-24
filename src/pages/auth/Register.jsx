import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import { userAPI } from '../../services/userAPI';

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataForm, setDataForm] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        role: "admin"
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const validateForm = () => {
        if (!dataForm.firstName.trim() || !dataForm.lastName.trim()) {
            setError("First name and last name are required");
            return false;
        }

        if (!dataForm.username.trim()) {
            setError("Username is required");
            return false;
        }

        if (dataForm.username.length < 3) {
            setError("Username must be at least 3 characters long");
            return false;
        }

        if (dataForm.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            // Check if username already exists
            const usernameExists = await userAPI.checkUniqueUsername(dataForm.username);
            if (usernameExists) {
                setError("Username already exists. Please choose a different username.");
                setLoading(false);
                return;
            }

            // Create new user
            const userData = {
                username: dataForm.username,
                password: dataForm.password,
                nama: `${dataForm.firstName} ${dataForm.lastName}`,
                role: dataForm.role
            };

            await userAPI.registerUser(userData);
            
            setSuccess("Account created successfully! Redirecting to login...");
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="card w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-blue-600 py-4 px-6">
                    <div className="flex items-center justify-center gap-3">
                        <div className="bg-white p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Tex Medical</h1>
                    </div>
                    <p className="text-blue-100 text-center mt-2">Hospital Management System</p>
                </div>

                <div className="card-body p-6">
                    <h2 className="text-xl font-semibold text-center text-gray-700">New Staff Registration</h2>
                    
                    {error && (
                        <div className="alert alert-error mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{success}</span>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={dataForm.firstName}
                                    onChange={handleChange}
                                    className="input input-bordered bg-gray-50"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={dataForm.lastName}
                                    onChange={handleChange}
                                    className="input input-bordered bg-gray-50"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={dataForm.username}
                                onChange={handleChange}
                                className="input input-bordered bg-gray-50"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select
                                name="role"
                                value={dataForm.role}
                                onChange={handleChange}
                                className="select select-bordered bg-gray-50"
                                required
                            >
                                <option value="admin">Admin</option>
                                <option value="doctor">Doctor</option>
                                <option value="nurse">Nurse</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={dataForm.password}
                                onChange={handleChange}
                                className="input input-bordered bg-gray-50"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={dataForm.confirmPassword}
                                onChange={handleChange}
                                className="input input-bordered bg-gray-50"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-control mt-8">
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <ImSpinner2 className="animate-spin mr-2" />
                                        Creating Account...
                                    </>
                                ) : 'Register Account'}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6 text-sm">
                        <p>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}