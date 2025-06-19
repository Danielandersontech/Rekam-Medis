import { Heart, Brain, Baby, Bone, Eye, Stethoscope, Activity, Shield, Clock, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Heart,
    title: "Cardiology",
    description: "Comprehensive heart care including diagnosis, treatment, and prevention of cardiovascular diseases.",
    features: ["ECG & Stress Testing", "Cardiac Catheterization", "Heart Surgery", "Preventive Care"],
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Specialized care for disorders of the nervous system, brain, and spinal cord.",
    features: ["Brain Imaging", "Stroke Treatment", "Epilepsy Care", "Memory Disorders"],
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Dedicated healthcare for infants, children, and adolescents from birth to 18 years.",
    features: ["Well-Child Visits", "Vaccinations", "Growth Monitoring", "Developmental Care"],
    color: "bg-pink-100 text-pink-600"
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description: "Treatment for musculoskeletal system injuries and disorders affecting bones and joints.",
    features: ["Joint Replacement", "Sports Medicine", "Fracture Care", "Physical Therapy"],
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description: "Complete eye care services including vision correction and surgical procedures.",
    features: ["Cataract Surgery", "LASIK", "Glaucoma Treatment", "Retinal Care"],
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Stethoscope,
    title: "Internal Medicine",
    description: "Primary care for adults focusing on prevention, diagnosis, and treatment of diseases.",
    features: ["Annual Checkups", "Chronic Disease Management", "Preventive Care", "Health Screenings"],
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Activity,
    title: "Emergency Medicine",
    description: "24/7 emergency care for urgent medical conditions and life-threatening situations.",
    features: ["Trauma Care", "Critical Care", "Emergency Surgery", "Ambulance Services"],
    color: "bg-red-100 text-red-700"
  },
  {
    icon: Shield,
    title: "Preventive Care",
    description: "Comprehensive preventive healthcare services to maintain optimal health.",
    features: ["Health Screenings", "Vaccinations", "Wellness Programs", "Lifestyle Counseling"],
    color: "bg-indigo-100 text-indigo-600"
  }
];

const emergencyServices = [
  "24/7 Emergency Department",
  "Trauma Surgery",
  "Critical Care Unit",
  "Ambulance Services",
  "Emergency Cardiac Care",
  "Stroke Response Team"
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Our Medical Services
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Comprehensive healthcare services delivered by expert medical professionals using advanced technology
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Medical Care
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of medical specialties and services to meet all your healthcare needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group">
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Emergency Services
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our emergency department is staffed 24/7 with experienced emergency physicians and specialists ready to handle any medical emergency. We provide rapid response and comprehensive emergency care.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {emergencyServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:911" 
                  className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                >
                  <Phone size={18} />
                  <span>Call 911</span>
                </a>
                <a 
                  href="tel:(237) 681-812-255" 
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Phone size={18} />
                  <span>Hospital Direct</span>
                </a>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop"
                alt="Emergency Department"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Schedule Your Appointment?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our medical professionals are ready to provide you with the highest quality care. Book your appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/appointment"
              className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition font-medium"
            >
              <Phone size={18} />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="mr-3 text-blue-600" />
                Operating Hours
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-gray-600">09:00 AM - 08:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Saturday</span>
                  <span className="text-gray-600">09:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Sunday</span>
                  <span className="text-gray-600">10:00 AM - 04:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-red-600">Emergency</span>
                  <span className="text-red-600 font-medium">24/7 Available</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose MEDDICAL?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Experienced medical professionals with specialized training</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">State-of-the-art medical equipment and facilities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Comprehensive care under one roof</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Patient-centered approach to healthcare</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">24/7 emergency services available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}