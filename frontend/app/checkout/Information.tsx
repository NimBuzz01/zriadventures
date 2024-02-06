import InputField from "@/components/common/InputField";
import { useCheckout } from "@/contexts/checkout-context";
import React, { SetStateAction, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import OtherInfo from "./OtherInfo";
import CountrySelect from "@/components/common/CountrySelect";
import MainButton from "@/components/common/MainButton";
import { useRouter } from "next/navigation";

interface Props {
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
  currentStep: number;
}

const Information = ({ setCurrentStep, currentStep }: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    contactNumber: "",
    nationality: "",
    addrLine1: "",
    addrLine2: "",
    city: "",
    postalCode: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    contactNumber: "",
    nationality: "",
    addrLine1: "",
    addrLine2: "",
    city: "",
    postalCode: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleCountryChange = (value: string) => {
    setFormData({
      ...formData,
      nationality: value,
    });
    setErrors({
      ...errors,
      nationality: "",
    });
  };

  const { setPersonalInfo } = useCheckout();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form data here
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\+/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must start with +(countrycode)";
    }

    if (!formData.nationality) {
      newErrors.nationality = "Nationality is required";
    }

    if (!formData.addrLine1) {
      newErrors.addrLine1 = "Address Line 1 is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.postalCode) {
      newErrors.postalCode = "Postal Code is required";
    }

    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);

    // If there are no errors, you can submit the form
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission here
      setPersonalInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        nationality: formData.nationality,
        addrLine1: formData.addrLine1,
        addrLine2: formData.addrLine2,
        city: formData.city,
        postalCode: formData.postalCode,
        contactNumber: formData.contactNumber,
      });
      setCurrentStep(currentStep + 1);
      router.push(`#`);
    }
  };

  return (
    <div className="w-full px-4 py-10 sm:p-16">
      <h2 className="mb-6 text-center text-3xl font-semibold uppercase text-blue-950">
        Information
      </h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            error={errors.firstName}
            onChange={handleChange}
            className="w-full"
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            error={errors.lastName}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <InputField
            label="Contact Number (include country code e.g. +65)"
            name="contactNumber"
            type="text"
            value={formData.contactNumber}
            error={errors.contactNumber}
            onChange={handleChange}
            className="w-full"
          />
          <CountrySelect
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            error={errors.nationality}
            onChange={handleCountryChange}
            className="w-full"
          />
        </div>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          error={errors.email}
          onChange={handleChange}
        />
        <InputField
          label="Address Line 1"
          name="addrLine1"
          type="text"
          value={formData.addrLine1}
          error={errors.addrLine1}
          onChange={handleChange}
          className="w-full"
        />
        <InputField
          label="Address Line 2"
          name="addrLine2"
          type="text"
          value={formData.addrLine2}
          error={errors.addrLine2}
          onChange={handleChange}
          className="w-full"
        />
        <div className="flex flex-col gap-6 md:flex-row">
          <InputField
            label="City"
            name="city"
            type="text"
            value={formData.city}
            error={errors.city}
            onChange={handleChange}
            className="w-full"
          />
          <InputField
            label="Postal Code"
            name="postalCode"
            type="text"
            value={formData.postalCode}
            error={errors.postalCode}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-center pt-16">
          <button
            type="submit"
            className="group flex w-44 items-center justify-center gap-2 rounded-sm bg-green-600 px-4 py-2.5 text-base font-medium uppercase tracking-wider text-white transition-all hover:bg-green-800 sm:px-6 sm:py-3 md:text-lg"
          >
            Next{" "}
            <BsArrowRight className="text-xl transition-all duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </form>
      <OtherInfo />
    </div>
  );
};

export default Information;
