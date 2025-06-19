import { Link } from 'react-router-dom';

export default function Register() {
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
                    
                    <form className="mt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
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
                                    className="input input-bordered bg-gray-50"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <input
                                type="email"
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
                                className="input input-bordered bg-gray-50"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-control mt-8">
                            <button type="submit" className="btn btn-primary btn-block">
                                Register Account
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