import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import { userAPI } from '../../services/userAPI';
import { BriefcaseMedical } from 'lucide-react';

export default function Forgot() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [step, setStep] = useState(1); // 1: Enter username, 2: Reset password
    const [userData, setUserData] = useState(null);
    const [dataForm, setDataForm] = useState({
        username: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const user = await userAPI.getUserByUsername(dataForm.username);
            setUserData(user);
            setStep(2);
            setSuccess(`User found: ${user.nama}. Please enter your new password.`);
        } catch (err) {
            setError(err.message || "User not found");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (dataForm.newPassword.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        if (dataForm.newPassword !== dataForm.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await userAPI.updatePassword(userData.username, dataForm.newPassword);
            setSuccess("Password updated successfully! You can now login with your new password.");
            setStep(3); // Success step
        } catch (err) {
            setError(err.message || "Password reset failed");
        } finally {
            setLoading(false);
        }
    };

    const renderStep1 = () => (
        <>
            <h2 className="text-xl font-semibold text-center text-gray-700">Password Recovery</h2>
            <p className="text-center text-gray-500 mt-2">Enter your username to reset your password</p>
            
            <form onSubmit={handleUsernameSubmit} className="mt-6 space-y-4">
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
                        placeholder="Enter your username"
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
                                Searching...
                            </>
                        ) : 'Find Account'}
                    </button>
                </div>
            </form>
        </>
    );

    const renderStep2 = () => (
        <>
            <h2 className="text-xl font-semibold text-center text-gray-700">Reset Password</h2>
            <p className="text-center text-gray-500 mt-2">Enter your new password for: <strong>{userData?.nama}</strong></p>
            
            <form onSubmit={handlePasswordReset} className="mt-6 space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">New Password</span>
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={dataForm.newPassword}
                        onChange={handleChange}
                        className="input input-bordered bg-gray-50"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confirm New Password</span>
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
                                Updating Password...
                            </>
                        ) : 'Update Password'}
                    </button>
                </div>
            </form>

            <div className="text-center mt-4">
                <button 
                    onClick={() => {
                        setStep(1);
                        setError("");
                        setSuccess("");
                    }}
                    className="text-blue-600 hover:underline text-sm"
                >
                    Back to Username Entry
                </button>
            </div>
        </>
    );

    const renderStep3 = () => (
        <>
            <h2 className="text-xl font-semibold text-center text-gray-700">Password Reset Complete</h2>
            <div className="text-center mt-6">
                <div className="bg-green-100 p-4 rounded-lg mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-green-800">Your password has been successfully updated!</p>
                </div>
                <Link to="/login" className="btn btn-primary btn-block">
                    Go to Login
                </Link>
            </div>
        </>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-2xl rounded-xl overflow-hidden max-w-xl md:max-w-3xl lg:max-w-4xl w-full transform transition-all duration-500 hover:scale-[1.01] animate-fade-in-down">
                
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

                <div className="card-body p-6">
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

                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}

                    {step !== 3 && (
                        <div className="text-center mt-6 text-sm">
                            <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
                        </div>
                    )}
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