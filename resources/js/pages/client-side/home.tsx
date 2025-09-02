import Applayout from '@/layouts/client-side/appLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { usePage } from '@inertiajs/react'
import contacts from '@/routes/contacts';
import InputError from '@/components/input-error';

export default function Home() {
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props
    console.log(flash)
    const { data, setData, post, processing, errors, reset, } = useForm<{
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        message: string;
        file: File | null;
    }>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
        file: null,
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(contacts.store.url(), {
            onSuccess: () => reset(),
            preserveScroll: true,

        });
    }
    return (
        <Applayout>
            <Head title="Home" />
            {/*  <!-- Marquee Notice --> */}
            <section
                className="relative bg-cover bg-center py-20 text-white"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Quality Printing & Stationary Services
                    </h2>
                    <p className="text-xl mb-8">
                        Serving Chitwan and surrounding areas since 2070 B.S.
                    </p>
                    <a
                        href="#contact"
                        className="bg-[#f59e0b] hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-colors duration-300"
                    >
                        Contact Us <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </section>


            {/* About Section */}
            <section id="about" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-[#2563eb] mb-12">About Us</h2>

                    <div className="flex flex-col md:flex-row items-center mb-12">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <img src="https://placehold.co/500x300/2563eb/FFFFFF?text=About+Fonet" alt="About Fonet" className="rounded-lg shadow-md" />
                        </div>
                        <div className="md:w-1/2 md:pl-12">
                            <h3 className="text-2xl font-semibold text-[#2563eb] mb-4">Welcome to Fonet Stationary Center</h3>
                            <p className="text-gray-700 mb-4">
                                Fonet Stationary Center (FCI) is located at central location of Bharatpur, in front of Saptagandaki Campus. We are here to cater you all required services for Computer such as typing, printing, photocopy and other related tasks.
                            </p>
                            <p className="text-gray-700">
                                We have earned trust of people from all Chitwan and neighbor for quality and quick service. Fonet Stationary Center is a registered and licensed business enterprise in the Business Service Centers that operates a standard business services firm.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 p-6 rounded-lg shadow">
                            <div className="text-[[#2563eb]] text-4xl mb-4">
                                <i className="fas fa-history"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[[#2563eb]] mb-3">History</h3>
                            <p className="text-gray-700">
                                FCI was established in 2070 B.S. We have been providing quality services to the community for years, building trust and long-term relationships with our customers.
                            </p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg shadow">
                            <div className="text-[[#2563eb]] text-4xl mb-4">
                                <i className="fas fa-bullseye"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[[#2563eb]] mb-3">Mission</h3>
                            <p className="text-gray-700">
                                Our mission is to establish a standard business services center that makes available a wide range of services and products at affordable prices to our customers.
                            </p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg shadow">
                            <div className="text-[[#2563eb]] text-4xl mb-4">
                                <i className="fas fa-eye"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[[#2563eb]] mb-3">Vision</h3>
                            <p className="text-gray-700">
                                Our vision is to build a business services center that will have active presence all over major locations, providing quality services to all our customers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-[[#2563eb]] mb-12">Our Services</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Service Card */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden service-card transition-all duration-300">
                            <img src="https://placehold.co/300x200/2563eb/FFFFFF?text=Photocopy" alt="Photocopy Service" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[[#2563eb]] mb-2">Photocopy Center</h3>
                                <p className="text-gray-700">High quality photocopy services with various paper options.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden service-card transition-all duration-300">
                            <img src="https://placehold.co/300x200/2563eb/FFFFFF?text=T-Shirt" alt="T-Shirt Printing" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[[#2563eb]] mb-2">T-Shirt Print</h3>
                                <p className="text-gray-700">Custom t-shirt printing for events, teams, and personal use.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden service-card transition-all duration-300">
                            <img src="https://placehold.co/300x200/2563eb/FFFFFF?text=Cup+Print" alt="Cup Printing" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[[#2563eb]] mb-2">Cup/Plate Print</h3>
                                <p className="text-gray-700">Custom printing on cups and plates for special occasions.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden service-card transition-all duration-300">
                            <img src="https://placehold.co/300x200/2563eb/FFFFFF?text=Photo+Print" alt="Photo Printing" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[[#2563eb]] mb-2">Photo & Stickers Print</h3>
                                <p className="text-gray-700">High quality photo printing and custom sticker creation.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden service-card transition-all duration-300">
                            <img src="https://placehold.co/300x200/2563eb/FFFFFF?text=Flex+Print" alt="Flex Printing" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[[#2563eb]] mb-2">Flex Print</h3>
                                <p className="text-gray-700">Large format flex printing for banners and advertisements.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden service-card transition-all duration-300">
                            <img src="https://placehold.co/300x200/2563eb/FFFFFF?text=Lamination" alt="Lamination" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[[#2563eb]] mb-2">Lamination</h3>
                                <p className="text-gray-700">Document lamination services for protection and durability.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden service-card transition-all duration-300">
                            <img src="https://placehold.co/300x200/2563eb/FFFFFF?text=Visiting+Card" alt="Visiting Cards" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[[#2563eb]] mb-2">Visiting Card</h3>
                                <p className="text-gray-700">Professional visiting card design and printing services.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden service-card transition-all duration-300">
                            <img src="https://placehold.co/300x200/2563eb/FFFFFF?text=PVC+Card" alt="PVC Cards" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-[[#2563eb]] mb-2">PVC Card</h3>
                                <p className="text-gray-700">Durable PVC card printing for IDs, membership cards, etc.</p>
                            </div>
                        </div>
                    </div>

                    {/* Typing Services */}
                    <div className="mt-16 bg-white p-8 rounded-lg shadow">
                        <h3 className="text-2xl font-semibold text-[[#2563eb]] mb-6">Typing Services</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xl font-medium text-[#1e40af] mb-4">Academic Typing</h4>
                                <p className="text-gray-700 mb-4">
                                    Our specialists ensure accurate typing with correct academic format and structure. All work is conducted by qualified staff in your field of study.
                                </p>

                                <h4 className="text-xl font-medium text-[#1e40af] mb-4">Thesis Typing Services</h4>
                                <p className="text-gray-700">
                                    We provide professional thesis typing with high accuracy, proper formatting, and quick turnaround time. Our experts understand academic requirements.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xl font-medium text-[#1e40af] mb-4">Document Typing Services</h4>
                                <p className="text-gray-700 mb-4">
                                    We handle all forms of documents from business plans to forms and templates, always following your specific requirements.
                                </p>

                                <h4 className="text-xl font-medium text-[#1e40af] mb-4">Editing Services</h4>
                                <p className="text-gray-700">
                                    Our editors polish existing documents to ensure they are error-free and properly formatted for your needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notice Section */}
            <section id="notice" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-[[#2563eb]] mb-12">Notice</h2>

                    <div className="bg-blue-50 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
                        <div className="flex items-start mb-4">
                            <div className="bg-[[#2563eb]] text-white p-3 rounded-full mr-4">
                                <i className="fas fa-bullhorn text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[[#2563eb]]">Important Announcement</h3>
                                <p className="text-gray-600">July 15, 2023</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4">
                            We are pleased to announce that Fonet Stationary Center will now be offering extended services including T-shirt printing, cup printing, and PVC card services. Visit us to experience these new offerings!
                        </p>
                        <a href="#" className="text-[[#2563eb]] hover:underline font-medium">Read more →</a>
                    </div>

                    <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
                        <div className="flex items-start mb-4">
                            <div className="bg-[[#2563eb]] text-white p-3 rounded-full mr-4">
                                <i className="fas fa-info-circle text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[[#2563eb]]">Holiday Notice</h3>
                                <p className="text-gray-600">June 30, 2023</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Please be informed that our center will remain closed on July 5th, 2023 due to a local holiday. We will resume our services on July 6th, 2023. Thank you for your understanding.
                        </p>
                        <a href="#" className="text-[[#2563eb]] hover:underline font-medium">Read more →</a>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-[[#2563eb]] mb-12">Gallery</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img src="https://placehold.co/400x300/2563eb/FFFFFF?text=Printing+Work" alt="Gallery Image 1" className="w-full h-48 object-cover hover:scale-105 transition duration-300" />
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img src="https://placehold.co/400x300/2563eb/FFFFFF?text=Photocopy" alt="Gallery Image 2" className="w-full h-48 object-cover hover:scale-105 transition duration-300" />
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img src="https://placehold.co/400x300/2563eb/FFFFFF?text=Binding" alt="Gallery Image 3" className="w-full h-48 object-cover hover:scale-105 transition duration-300" />
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img src="https://placehold.co/400x300/2563eb/FFFFFF?text=T-Shirt+Print" alt="Gallery Image 4" className="w-full h-48 object-cover hover:scale-105 transition duration-300" />
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img src="https://placehold.co/400x300/2563eb/FFFFFF?text=Visiting+Cards" alt="Gallery Image 5" className="w-full h-48 object-cover hover:scale-105 transition duration-300" />
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img src="https://placehold.co/400x300/2563eb/FFFFFF?text=Thesis+Work" alt="Gallery Image 6" className="w-full h-48 object-cover hover:scale-105 transition duration-300" />
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img src="https://placehold.co/400x300/2563eb/FFFFFF?text=Stationary" alt="Gallery Image 7" className="w-full h-48 object-cover hover:scale-105 transition duration-300" />
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img src="https://placehold.co/400x300/2563eb/FFFFFF?text=Cup+Printing" alt="Gallery Image 8" className="w-full h-48 object-cover hover:scale-105 transition duration-300" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
                <div className="container mx-auto px-4">
                    {/* Heading */}
                    <h2 className="text-4xl font-extrabold text-center text-[#2563eb] mb-14 relative">
                        Contact Us
                        <span className="block w-20 h-1 bg-[#2563eb] mx-auto mt-3 rounded-full"></span>
                    </h2>

                    <div className="flex flex-col md:flex-row gap-10">
                        {/* Contact Form */}
                        <div className="md:w-1/2">
                            {flash.success && (
                                <div className="flex justify-center bg-green-500 text-white px-4 py-2 rounded-md mb-4 shadow-md animate-pulse">
                                    {flash.success}
                                </div>
                            )}
                            {flash.error && (
                                <div className="flex justify-center bg-red-500 text-white px-4 py-2 rounded-md mb-4 shadow-md animate-bounce">
                                    {flash.error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">First Name</label>
                                        <input
                                            name="first_name"
                                            value={data.first_name}
                                            onChange={(e) => setData("first_name", e.target.value)}
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData("last_name", e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Phone No</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={data.phone}
                                        onChange={(e) => setData("phone", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        name="email"
                                        onChange={(e) => setData("email", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">File (Optional)</label>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={(e) => setData("file", e.target.files ? e.target.files[0] : null)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData("message", e.target.value)}
                                        className="`(errors.message && border-red-600)`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                                    ></textarea>
                                    <InputError message={errors.message} className="mt-2" />
                                    {/* {errors.message && <div className="text-red-500 mt-2">{errors.message}</div>} */}
                                </div>

                                <button
                                    type="submit"
                                    className="hover:cursor-pointer w-full md:w-auto bg-[#2563eb] hover:bg-[#1e40af] text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                                >
                                    {processing ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Details */}
                        <div className="md:w-1/2">
                            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 h-full">
                                <h3 className="text-2xl font-bold text-[#2563eb] mb-8">Get In Touch</h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Address</h4>
                                        <p className="text-gray-600">Bharatpur Metropolitan City, Ward No. 10</p>
                                        <p className="text-gray-600">Saptagandaki Chowk, Chitwan, Nepal</p>
                                        <p className="text-gray-600">(In front of Saptagandaki Campus)</p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h4>
                                        <p className="text-gray-700 flex items-center gap-3">
                                            <i className="fas fa-phone-alt text-[#2563eb]"></i> Phone: 056526307
                                        </p>
                                        <p className="text-gray-700 flex items-center gap-3">
                                            <i className="fas fa-mobile-alt text-[#2563eb]"></i> Mobile: 9845220077
                                        </p>
                                        <p className="text-gray-700 flex items-center gap-3">
                                            <i className="fas fa-envelope text-[#2563eb]"></i> Email: fcichitwan@gmail.com
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Business Hours</h4>
                                        <p className="text-gray-600">Sunday - Friday: 8:00 AM - 7:00 PM</p>
                                        <p className="text-gray-600">Saturday: 9:00 AM - 5:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Applayout>
    )
}