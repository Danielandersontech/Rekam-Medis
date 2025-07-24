import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import { userAPI } from '../../services/userAPI';
import { UserPlus, BriefcaseMedical } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full transform transition-all duration-500 hover:scale-[1.01] animate-fade-in-down">                
                {/* Header Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8 text-white">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="bg-white p-3 rounded-full shadow-md">
                            <BriefcaseMedical size={40} className="text-blue-600" /> 
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Tex Medical</h1>
                        <p className="text-blue-100 text-base opacity-90">Hospital Management System</p> 
                    </div>
                </div>

                {/* Body Card - Form Registrasi */}
                <div className="p-8 md:p-10 lg:p-12"> 
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2"> 
                        <UserPlus size={24} className="text-blue-500" /> New Staff Registration
                    </h2>
                    
                    {error && (
                        <div role="alert" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6">
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-6">
                            <strong className="font-bold">Success! </strong>
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                            <div className="form-control">
                                <label className="block text-gray-700 text-sm md:text-base font-medium mb-1" htmlFor="firstName"> 
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={dataForm.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50 text-gray-800 text-base"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="block text-gray-700 text-sm md:text-base font-medium mb-1" htmlFor="lastName"> 
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={dataForm.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50 text-gray-800 text-base"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="block text-gray-700 text-sm md:text-base font-medium mb-1" htmlFor="username"> 
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={dataForm.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50 text-gray-800 text-base"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="block text-gray-700 text-sm md:text-base font-medium mb-1" htmlFor="role"> 
                                Role
                            </label>
                            <select
                                name="role"
                                id="role"
                                value={dataForm.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50 text-gray-800 text-base"
                                required
                            >
                                <option value="admin">Admin</option>
                                <option value="doctor">Doctor</option>
                                <option value="nurse">Nurse</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="block text-gray-700 text-sm md:text-base font-medium mb-1" htmlFor="password"> 
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={dataForm.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50 text-gray-800 text-base"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="block text-gray-700 text-sm md:text-base font-medium mb-1" htmlFor="confirmPassword"> 
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={dataForm.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-gray-50 text-gray-800 text-base"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-control pt-4">
                            <button 
                                type="submit" 
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3.5 rounded-lg text-lg md:text-xl font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <ImSpinner2 className="animate-spin mr-2" size={22} />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={22} /> Register Account
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-8 text-base md:text-lg"> 
                        <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition duration-200">Login here</Link></p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in-down {
                    from {
                        opacity: 0;
                        transform: translateY(-15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}