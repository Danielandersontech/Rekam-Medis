
import testimonials from "../../assets/testimonials.json";
export default function Testimonials() {
  return (
    <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Apa Kata Pelanggan Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jangan hanya percaya pada kata kami. Berikut adalah pendapat para
              pelanggan tentang layanan kami.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.date}</p>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.comment}"</p>
                <div className="flex mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
