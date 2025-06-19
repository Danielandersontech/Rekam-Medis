import { Heart, Shield, Award, Users, Activity, Clock } from "lucide-react";

const stats = [
  { number: "1000+", label: "Happy Patients", icon: Users },
  { number: "50+", label: "Expert Doctors", icon: Award },
  { number: "15+", label: "Years Experience", icon: Clock },
  { number: "100%", label: "Success Rate", icon: Activity }
];

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We treat every patient with empathy, respect, and personalized attention to ensure comfort and healing."
  },
  {
    icon: Shield,
    title: "Quality & Safety",
    description: "Our commitment to the highest medical standards ensures safe, effective, and reliable healthcare services."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We continuously strive for excellence in medical care, technology, and patient satisfaction."
  },
  {
    icon: Activity,
    title: "Innovation",
    description: "We embrace cutting-edge medical technology and innovative treatments to provide the best outcomes."
  }
];

export default function Tentang() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            About MEDDICAL
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Leading the Way in Medical Excellence with over 15 years of dedicated service to our community
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop"
                alt="Medical Team"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional healthcare services through innovation, compassion, and excellence in medical practice. We are committed to improving the health and well-being of our community by delivering personalized, high-quality medical care that exceeds expectations.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading healthcare provider recognized for outstanding patient care, advanced treatments, and medical breakthroughs. We envision a healthier future where every patient receives world-class medical care in a compassionate and supportive environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment to exceptional healthcare
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-xl text-gray-600">
                A journey of dedication, growth, and unwavering commitment to healthcare excellence
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
                  alt="Hospital Building"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Founded in 2008, MEDDICAL began as a small clinic with a big vision: to provide world-class healthcare services to our community. What started with a team of 5 dedicated professionals has grown into a comprehensive medical facility serving thousands of patients annually.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Over the years, we have expanded our services, adopted cutting-edge medical technology, and built a team of highly qualified specialists. Our commitment to continuous improvement and patient-centered care has made us a trusted name in healthcare.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, we continue to grow and evolve, always staying true to our founding principles of compassion, excellence, and innovation in medical care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Meet the experienced professionals leading our mission
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                position: "Chief Medical Officer",
                specialization: "Cardiology",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Dr. Michael Chen",
                position: "Head of Emergency Medicine",
                specialization: "Emergency Medicine",
                image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Dr. Emily Rodriguez",
                position: "Director of Pediatrics",
                specialization: "Pediatrics",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-1">{member.position}</p>
                <p className="text-gray-600">{member.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}