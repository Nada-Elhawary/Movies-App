import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Contact.css";

export default function Contact() {

    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const password = watch("password");

    const onSubmit = (data) => {
        console.log(data);
        setSuccess(true);
        reset();
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    return (
        <div className="contact-container">
            <div className="contact-card">
                <h2 className="contact-title">
                    Contact Us 
                </h2>
                {success && (
                    <div className="success-message">
                        Message sent successfully 
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Full Name */}

                    <input
                        placeholder="Full Name"
                        className="cinema-input"
                        {...register("fullName", {
                            required: "Full name required",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters"
                            }
                        })}
                    />

                    <p className="error-text">
                        {errors.fullName?.message}
                    </p>


                    {/* Email */}

                    <input
                        placeholder="Email"
                        className="cinema-input"
                        {...register("email", {
                            required: "Email required",
                            pattern: {
                                value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
                                message: "Invalid email"
                            }
                        })}
                    />

                    <p className="error-text">
                        {errors.email?.message}
                    </p>

                    {/* Subject */}

                    <select
                        className="cinema-input"
                        {...register("subject", {
                            required: "Select subject"
                        })}
                    >

                        <option value="" className="bg-dark">
                            Select Subject
                        </option>

                        <option className="bg-dark">
                            Support
                        </option>

                        <option className="bg-dark">
                            Feedback
                        </option>

                        <option className="bg-dark">
                            Business Inquiry
                        </option>

                    </select>

                    <p className="error-text">
                        {errors.subject?.message}
                    </p>


                    {/* Message */}

                    <textarea
                        placeholder="Message"
                        className="cinema-input"
                        {...register("message", {
                            required: "Message required",
                            minLength: {
                                value: 10,
                                message: "Minimum 10 characters"
                            }
                        })}
                    />

                    <p className="error-text">
                        {errors.message?.message}
                    </p>


                    {/* Phone */}

                    <input
                        placeholder="Phone (optional)"
                        className="cinema-input"
                        {...register("phone", {
                            pattern: {
                                value: /^[0-9]{11}$/,
                                message: "Phone must be 11 digits"
                            }
                        })}
                    />

                    <p className="error-text">
                        {errors.phone?.message}
                    </p>


                    <button className="submit-btn">

                        Send Message

                    </button>

                </form>
                
            </div>

        </div>

    );

}