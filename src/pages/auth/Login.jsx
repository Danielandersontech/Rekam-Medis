import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            });

            if (response.status === 200) {
                navigate("/admin");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
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
                    <h2 className="text-xl font-semibold text-center text-gray-700">Staff Login</h2>
                    
                    {error && (
                        <div className="alert alert-error mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={dataForm.email}
                                onChange={handleChange}
                                className="input input-bordered bg-gray-50"
                                placeholder="your@email.com"
                                required
                            />
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

                        <div className="form-control mt-8">
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <ImSpinner2 className="animate-spin mr-2" />
                                        Authenticating...
                                    </>
                                ) : 'Login'}
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-between mt-6 text-sm">
                        <Link to="/forgot" className="text-blue-600 hover:underline">Forgot Password?</Link>
                        <Link to="/register" className="text-blue-600 hover:underline">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}