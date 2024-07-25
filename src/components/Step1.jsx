import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import useUserStore from "../store/userStore";
import * as Yup from "yup";
import styles from "../style"; // Adjust the import path if necessary
import axios from "axios";

const questionMapping = {
  fullName: { question_name: "Full Name", question_type: "String" },
  address: { question_name: "Address", question_type: "String" },
  contactMethod: { question_name: "Contact Method", question_type: "String" },
  contactTimes: { question_name: "Contact Times", question_type: "String" },
  username: { question_name: "Username", question_type: "String" },
  securityQuestions: {
    question_name: "Security Questions",
    question_type: "String",
  },
  authentication: { question_name: "Authentication", question_type: "String" },
  services: { question_name: "Services", question_type: "String" },
  moreInfo: { question_name: "More Info", question_type: "String" },
  specificGoals: { question_name: "Specific Goals", question_type: "String" },
  language: { question_name: "Language", question_type: "String" },
  timeZone: { question_name: "Time Zone", question_type: "String" },
  updates: { question_name: "Updates", question_type: "String" },
  frequency: { question_name: "Frequency", question_type: "String" },
  accessibility: { question_name: "Accessibility", question_type: "String" },
  paymentMethod: { question_name: "Payment Method", question_type: "String" },
  quickAccess: { question_name: "Quick Access", question_type: "String" },
  hobbies: { question_name: "Hobbies", question_type: "String" },
  hearAboutUs: { question_name: "Hear About Us", question_type: "String" },
  expectations: { question_name: "Expectations", question_type: "String" },
  experienceImprovement: {
    question_name: "Experience Improvement",
    question_type: "String",
  },
  termsAgree: { question_name: "Terms Agree", question_type: "String" },
  privacyConcerns: {
    question_name: "Privacy Concerns",
    question_type: "String",
  },
  additionalComments: {
    question_name: "Additional Comments",
    question_type: "String",
  },
};

const AccountSetupForm = () => {
  const navigate = useNavigate();
  const getUser_id = useUserStore((state) => state.getUser_id);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "Mr.",
    contactMethod: "Email",
    contactTimes: "",
    username: "",
    securityQuestions: "No",
    authentication: "Password",
    services: "",
    moreInfo: "",
    specificGoals: "",
    language: "",
    timeZone: "",
    updates: "No",
    frequency: "Monthly",
    accessibility: "",
    paymentMethod: "",
    quickAccess: "No",
    hobbies: "",
    hearAboutUs: "",
    expectations: "",
    experienceImprovement: "",
    termsAgree: "No",
    privacyConcerns: "",
    additionalComments: "",
  });

  const convertToSchemaFormat = (data, userId) => {
    const questionsArray = Object.keys(data)
      .map((key, index) => {
        if (questionMapping[key]) {
          return {
            question_name: questionMapping[key].question_name,
            question_id: index + 1, // Assuming question_id is a sequential number
            question_type: questionMapping[key].question_type,
            answer: data[key],
          };
        }
        return null;
      })
      .filter((question) => question !== null);

    return {
      user_id: userId,
      question: questionsArray,
    };
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      contactTimes: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      services: Yup.string().required("Required"),
      moreInfo: Yup.string().required("Required"),
      specificGoals: Yup.string().required("Required"),
      language: Yup.string().required("Required"),
      timeZone: Yup.string().required("Required"),
      accessibility: Yup.string().required("Required"),
      paymentMethod: Yup.string().required("Required"),
      hobbies: Yup.string().required("Required"),
      hearAboutUs: Yup.string().required("Required"),
      expectations: Yup.string().required("Required"),
      experienceImprovement: Yup.string().required("Required"),
      privacyConcerns: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 2));
      const userId = getUser_id();
      const convertedData = convertToSchemaFormat(values, userId);
      console.log(convertedData);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/createAnswers",
          convertedData
        );
        
        console.log(response);
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      }
      // alert('Form submitted! Check the console for JSON output.');
      // Adjust the navigation path if necessary
    },
  });

  return (
    <div
      className={`bg-black-gradient p-6 rounded-lg shadow-md w-full max-w-md mx-auto ${styles.boxWidth}`}
    >
      <h2 className={`${styles.heading2} mb-6 text-white`}>
        Account Setup Form
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-300 font-bold mb-2"
          >
            1. Full Name:
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.fullName ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.fullName}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-300 font-bold mb-2"
          >
            2. How would you like us to address you?
          </label>
          <select
            id="address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          >
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Dr.">Dr.</option>
            <option value="FirstName">First Name</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="contactMethod"
            className="block text-gray-300 font-bold mb-2"
          >
            3. Preferred contact method:
          </label>
          <select
            id="contactMethod"
            name="contactMethod"
            onChange={formik.handleChange}
            value={formik.values.contactMethod}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          >
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="Text">Text</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="contactTimes"
            className="block text-gray-300 font-bold mb-2"
          >
            4. Preferred contact times:
          </label>
          <input
            id="contactTimes"
            name="contactTimes"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.contactTimes}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.contactTimes ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.contactTimes}
            </div>
          ) : null}
        </div>

        <h2 className={`${styles.heading2} mb-6 text-white`}>Account Setup</h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-300 font-bold mb-2"
          >
            5. Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.username ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.username}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="securityQuestions"
            className="block text-gray-300 font-bold mb-2"
          >
            6. Set up security questions for account recovery?
          </label>
          <select
            id="securityQuestions"
            name="securityQuestions"
            onChange={formik.handleChange}
            value={formik.values.securityQuestions}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="authentication"
            className="block text-gray-300 font-bold mb-2"
          >
            7. Preferred login method:
          </label>
          <select
            id="authentication"
            name="authentication"
            onChange={formik.handleChange}
            value={formik.values.authentication}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          >
            <option value="Password">Password</option>
            <option value="Biometric">Biometric</option>
          </select>
        </div>

        <h2 className={`${styles.heading2} mb-6 text-white`}>
          Service Preferences
        </h2>

        <div className="mb-4">
          <label
            htmlFor="services"
            className="block text-gray-300 font-bold mb-2"
          >
            8. Most interested in:
          </label>
          <input
            id="services"
            name="services"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.services}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.services ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.services}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="moreInfo"
            className="block text-gray-300 font-bold mb-2"
          >
            9. Services you want more information about:
          </label>
          <input
            id="moreInfo"
            name="moreInfo"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.moreInfo}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.moreInfo ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.moreInfo}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="specificGoals"
            className="block text-gray-300 font-bold mb-2"
          >
            10. Specific goals or needs:
          </label>
          <input
            id="specificGoals"
            name="specificGoals"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.specificGoals}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.specificGoals ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.specificGoals}
            </div>
          ) : null}
        </div>

        <h2 className={`${styles.heading2} mb-6 text-white`}>
          Communication Preferences
        </h2>

        <div className="mb-4">
          <label
            htmlFor="language"
            className="block text-gray-300 font-bold mb-2"
          >
            11. Preferred language for communication:
          </label>
          <input
            id="language"
            name="language"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.language}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.language ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.language}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="timeZone"
            className="block text-gray-300 font-bold mb-2"
          >
            12. Preferred time zone:
          </label>
          <input
            id="timeZone"
            name="timeZone"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.timeZone}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.timeZone ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.timeZone}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="updates"
            className="block text-gray-300 font-bold mb-2"
          >
            13. Receive updates or newsletters?
          </label>
          <select
            id="updates"
            name="updates"
            onChange={formik.handleChange}
            value={formik.values.updates}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="frequency"
            className="block text-gray-300 font-bold mb-2"
          >
            14. Frequency of communications:
          </label>
          <select
            id="frequency"
            name="frequency"
            onChange={formik.handleChange}
            value={formik.values.frequency}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <h2 className={`${styles.heading2} mb-6 text-white`}>
          Accessibility and Convenience
        </h2>

        <div className="mb-4">
          <label
            htmlFor="accessibility"
            className="block text-gray-300 font-bold mb-2"
          >
            15. Require accessibility accommodations?
          </label>
          <input
            id="accessibility"
            name="accessibility"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.accessibility}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.accessibility ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.accessibility}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="paymentMethod"
            className="block text-gray-300 font-bold mb-2"
          >
            16. Preferred payment method:
          </label>
          <input
            id="paymentMethod"
            name="paymentMethod"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.paymentMethod}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.paymentMethod ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.paymentMethod}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="quickAccess"
            className="block text-gray-300 font-bold mb-2"
          >
            17. Set up quick access to features or services?
          </label>
          <select
            id="quickAccess"
            name="quickAccess"
            onChange={formik.handleChange}
            value={formik.values.quickAccess}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <h2 className={`${styles.heading2} mb-6 text-white`}>
          Feedback and Interests
        </h2>

        <div className="mb-4">
          <label
            htmlFor="hobbies"
            className="block text-gray-300 font-bold mb-2"
          >
            18. Hobbies or interests:
          </label>
          <input
            id="hobbies"
            name="hobbies"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.hobbies}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.hobbies ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.hobbies}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="hearAboutUs"
            className="block text-gray-300 font-bold mb-2"
          >
            19. How did you hear about us?
          </label>
          <input
            id="hearAboutUs"
            name="hearAboutUs"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.hearAboutUs}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.hearAboutUs ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.hearAboutUs}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="expectations"
            className="block text-gray-300 font-bold mb-2"
          >
            20. Expectations from this service:
          </label>
          <input
            id="expectations"
            name="expectations"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.expectations}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.expectations ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.expectations}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="experienceImprovement"
            className="block text-gray-300 font-bold mb-2"
          >
            21. Anything to make your experience better?
          </label>
          <input
            id="experienceImprovement"
            name="experienceImprovement"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.experienceImprovement}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.experienceImprovement ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.experienceImprovement}
            </div>
          ) : null}
        </div>

        <h2 className={`${styles.heading2} mb-6 text-white`}>
          Legal and Privacy
        </h2>

        <div className="mb-4">
          <label
            htmlFor="termsAgree"
            className="block text-gray-300 font-bold mb-2"
          >
            22. Agree to terms of service and privacy policy?
          </label>
          <select
            id="termsAgree"
            name="termsAgree"
            onChange={formik.handleChange}
            value={formik.values.termsAgree}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="privacyConcerns"
            className="block text-gray-300 font-bold mb-2"
          >
            23. Any data or privacy concerns?
          </label>
          <input
            id="privacyConcerns"
            name="privacyConcerns"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.privacyConcerns}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.privacyConcerns ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.privacyConcerns}
            </div>
          ) : null}
        </div>

        <h2 className={`${styles.heading2} mb-6 text-white`}>
          Finalizing Setup
        </h2>

        <div className="mb-4">
          <label
            htmlFor="additionalComments"
            className="block text-gray-300 font-bold mb-2"
          >
            24. Anything else to add or ask?
          </label>
          <input
            id="additionalComments"
            name="additionalComments"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.additionalComments}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AccountSetupForm;
