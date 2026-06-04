import gallery1 from "../assets/Gallery1.jpg"
import gallery2 from "../assets/Gallery2.jpg"
import gallery3 from "../assets/Gallery3.jpg"
import gallery4 from "../assets/Gallery4.jpg"

function Gallery() {
  const images = [gallery1, gallery2, gallery3, gallery4]

  return (
    <section 
    id="gallery"
    className="py-16 px-8 bg-white">
      
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">
          Inspired Interiors
        </h2>

        <p className="text-gray-600 text-lg">
          Elegant spaces crafted with timeless decor aesthetics.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl shadow-lg"
          >
            <img
              src={image}
              alt="Interior"
              className="w-full h-[320px] object-cover hover:scale-105 transition duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery