import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import useUserStore from "../store/userStore";
import * as Yup from "yup";
import styles from "../style"; // Adjust the import path if necessary
import axios from "axios";




const questionMapping = {
  fullName: { question_name: "Full Name", question_type: "String" },
  address: { question_name: "How would you like us to address you? (Mr./Ms./Dr., first name, etc.)", question_type: "String" },
  contactMethod: { question_name: "What is your preferred contact method? (Email, phone, text, etc.)", question_type: "String" },
  contactTimes: { question_name: "What are your preferred contact times?", question_type: "String" },
  username: { question_name: "What username would you like to use for your account?", question_type: "String" },
  securityQuestions: {
    question_name: "Would you like to set up security questions for account recovery? (If yes, ask for the questions and answers.)",
    question_type: "String",
  },
  authentication: { question_name: "Do you prefer to log in with a password or use biometric authentication?", question_type: "String" },
  services: { question_name: "Which of our services are you most interested in?", question_type: "String" },
  moreInfo: { question_name: "Are there any services you would like more information about?", question_type: "String" },
  specificGoals: { question_name: "Do you have any specific goals or needs that our service should prioritize?", question_type: "String" },
  language: { question_name: "Which language do you prefer for communication?", question_type: "String" },
  timeZone: { question_name: "Do you have a preferred time zone for scheduling purposes?", question_type: "String" },
  updates: { question_name: "Would you like to receive updates or newsletters from us?", question_type: "String" },
  frequency: { question_name: "How often would you like to receive communications from us?", question_type: "String" },
  accessibility: { question_name: "Do you require any accessibility accommodations? (e.g., screen reader-friendly services, large text)", question_type: "String" },
  paymentMethod: { question_name: "What is your preferred payment method for paid services?", question_type: "String" },
  quickAccess: { question_name: "Would you like to set up quick access to certain features or services?", question_type: "String" },
  hobbies: { question_name: "What are your hobbies or interests? (This can help in personalizing the type of content or offers you receive.)", question_type: "String" },
  hearAboutUs: { question_name: "How did you hear about us?", question_type: "String" },
  expectations: { question_name: "What are your expectations from this service?", question_type: "String" },
  experienceImprovement: { question_name: "Is there anything specific that can make your experience with us better?", question_type: "String" },
  termsAgree: { question_name: "Do you agree to our terms of service and privacy policy?", question_type: "String" },
  privacyConcerns: { question_name: "Are there any data or privacy concerns you would like us to address?", question_type: "String" },
  additionalComments: { question_name: "Is there anything else you'd like to add or ask about setting up your account?", question_type: "String" },
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
            6. Security questions enabled?
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
            7. Preferred authentication method:
          </label>
          <select
            id="authentication"
            name="authentication"
            onChange={formik.handleChange}
            value={formik.values.authentication}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          >
            <option value="Password">Password</option>
            <option value="Fingerprint">Fingerprint</option>
            <option value="Facial Recognition">Facial Recognition</option>
            <option value="OTP">OTP</option>
          </select>
        </div>

        <h2 className={`${styles.heading2} mb-6 text-white`}>Services</h2>

<div className="mb-4">
  <label htmlFor="services" className="block text-gray-300 font-bold mb-2">
    8. Services interested in:
  </label>
  <select
    id="services"
    name="services"
    onChange={formik.handleChange}
    value={formik.values.services}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
  >
    <option value="">Select a service</option>
    <option value="Customer Support">Customer Support</option>
    <option value="Technical Support">Technical Support</option>
    <option value="Account Management">Account Management</option>
    <option value="Billing Support">Billing Support</option>
    <option value="Feedback Collection">Feedback Collection</option>
    <option value="Product Returns">Product Returns</option>
    <option value="Live Chat Support">Live Chat Support</option>
    <option value="Email Support">Email Support</option>
    <option value="Other">Other (Specify if selected)</option>
  </select>
  {formik.errors.services && (
    <div className="text-red-500 text-xs italic mt-2">
      {formik.errors.services}
    </div>
  )}
</div>


        <div className="mb-4">
          <label
            htmlFor="moreInfo"
            className="block text-gray-300 font-bold mb-2"
          >
            9. More information required:
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
  <label htmlFor="specificGoals" className="block text-gray-300 font-bold mb-2">
    10. Any specific goals:
  </label>
  <select
    id="specificGoals"
    name="specificGoals"
    onChange={formik.handleChange}
    value={formik.values.specificGoals}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
  >
    <option value="">Select a goal</option>
    <option value="Improve Customer Satisfaction">Improve Customer Satisfaction</option>
    <option value="Increase Efficiency">Increase Efficiency</option>
    <option value="Reduce Costs">Reduce Costs</option>
    <option value="Expand Market Reach">Expand Market Reach</option>
    <option value="Enhance Brand Awareness">Enhance Brand Awareness</option>
    <option value="Other">Other (Please specify below)</option>
  </select>
  {formik.values.specificGoals === 'Other' && (
    <input
      type="text"
      name="specificGoalsDetails"
      placeholder="Please specify your specific goal"
      onChange={formik.handleChange}
      value={formik.values.specificGoalsDetails}
      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
    />
  )}
  {formik.errors.specificGoals && (
    <div className="text-red-500 text-xs italic mt-2">
      {formik.errors.specificGoals}
    </div>
  )}
</div>


        <h2 className={`${styles.heading2} mb-6 text-white`}>Preferences</h2>

        <div className="mb-4">
  <label htmlFor="language" className="block text-gray-300 font-bold mb-2">
    11. Preferred language:
  </label>
  <select
    id="language"
    name="language"
    onChange={formik.handleChange}
    value={formik.values.language}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
  >
    <option value="">Select a language</option>
    <option value="English">English</option>
    <option value="Spanish">Spanish</option>
    <option value="French">French</option>
    <option value="German">German</option>
    <option value="Chinese">Chinese</option>
    <option value="Japanese">Japanese</option>
    <option value="Russian">Russian</option>
    <option value="Arabic">Arabic</option>
    <option value="Portuguese">Portuguese</option>
    <option value="Hindi">Hindi</option>
  </select>
  {formik.errors.language && (
    <div className="text-red-500 text-xs italic mt-2">
      {formik.errors.language}
    </div>
  )}
</div>


<div className="mb-4">
  <label htmlFor="timeZone" className="block text-gray-300 font-bold mb-2">
    12. Time zone:
  </label>
  <select
    id="timeZone"
    name="timeZone"
    onChange={formik.handleChange}
    value={formik.values.timeZone}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
  >
    <option value="">Select your time zone</option>
    <option value="UTC-12:00">UTC-12:00 International Date Line West</option>
    <option value="UTC-11:00">UTC-11:00 Coordinated Universal Time-11</option>
    <option value="UTC-10:00">UTC-10:00 Hawaii</option>
    <option value="UTC-09:00">UTC-09:00 Alaska</option>
    <option value="UTC-08:00">UTC-08:00 Pacific Time (US & Canada)</option>
    <option value="UTC-07:00">UTC-07:00 Mountain Time (US & Canada)</option>
    <option value="UTC-06:00">UTC-06:00 Central Time (US & Canada)</option>
    <option value="UTC-05:00">UTC-05:00 Eastern Time (US & Canada)</option>
    <option value="UTC-04:00">UTC-04:00 Atlantic Time (Canada)</option>
    <option value="UTC-03:30">UTC-03:30 Newfoundland</option>
    <option value="UTC-03:00">UTC-03:00 Argentina, Brazil, French Guiana, Uruguay</option>
    <option value="UTC-02:00">UTC-02:00 South Georgia/South Sandwich Islands</option>
    <option value="UTC-01:00">UTC-01:00 Azores</option>
    <option value="UTC±00:00">UTC±00:00 Greenwich Mean Time, Western European Time</option>
    <option value="UTC+01:00">UTC+01:00 Central European Time, West Africa Time</option>
    <option value="UTC+02:00">UTC+02:00 Central Africa Time, Eastern European Time, Kaliningrad Time</option>
    <option value="UTC+03:00">UTC+03:00 Moscow Time, East Africa Time, Arabia Standard Time</option>
    <option value="UTC+03:30">UTC+03:30 Iran Standard Time</option>
    <option value="UTC+04:00">UTC+04:00 Azerbaijan Standard Time, Samara Time</option>
    <option value="UTC+04:30">UTC+04:30 Afghanistan</option>
    <option value="UTC+05:00">UTC+05:00 Pakistan Standard Time, Yekaterinburg Time</option>
    <option value="UTC+05:30">UTC+05:30 Indian Standard Time, Sri Lanka Time</option>
    <option value="UTC+05:45">UTC+05:45 Nepal Time</option>
    <option value="UTC+06:00">UTC+06:00 Bangladesh Standard Time, Bhutan Time, Omsk Time</option>
    <option value="UTC+06:30">UTC+06:30 Cocos Islands, Myanmar</option>
    <option value="UTC+07:00">UTC+07:00 Krasnoyarsk Time, Cambodia, Laos, Thailand, Vietnam</option>
    <option value="UTC+08:00">UTC+08:00 Australian Western Standard Time, Beijing Time, Irkutsk Time</option>
    <option value="UTC+08:45">UTC+08:45 Australian Central Western Standard Time</option>
    <option value="UTC+09:00">UTC+09:00 Japan Standard Time, Korea Standard Time, Yakutsk Time</option>
    <option value="UTC+09:30">UTC+09:30 Australian Central Standard Time</option>
    <option value="UTC+10:00">UTC+10:00 Australian Eastern Standard Time, Vladivostok Time</option>
    <option value="UTC+10:30">UTC+10:30 Lord Howe Island</option>
    <option value="UTC+11:00">UTC+11:00 Srednekolymsk Time, Solomon Islands, Vanuatu</option>
    <option value="UTC+12:00">UTC+12:00 Fiji, Gilbert Islands, Kamchatka Time, New Zealand Standard Time</option>
    <option value="UTC+12:45">UTC+12:45 Chatham Islands Standard Time</option>
    <option value="UTC+13:00">UTC+13:00 Samoa Time Zone, Phoenix Islands Time, Tonga</option>
    <option value="UTC+14:00">UTC+14:00 Line Islands</option>
  </select>
  {formik.errors.timeZone && (
    <div className="text-red-500 text-xs italic mt-2">
      {formik.errors.timeZone}
    </div>
  )}
</div>


        <div className="mb-4">
          <label
            htmlFor="updates"
            className="block text-gray-300 font-bold mb-2"
          >
            13. Would you like to receive updates?
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
            14. Frequency of updates:
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

        <div className="mb-4">
          <label
            htmlFor="accessibility"
            className="block text-gray-300 font-bold mb-2"
          >
            15. Any accessibility requirements:
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

        <h2 className={`${styles.heading2} mb-6 text-white`}>
          Payment and Billing
        </h2>

        <div className="mb-4">
  <label htmlFor="paymentMethod" className="block text-gray-300 font-bold mb-2">
    16. Preferred payment method:
  </label>
  <select
    id="paymentMethod"
    name="paymentMethod"
    onChange={formik.handleChange}
    value={formik.values.paymentMethod}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
  >
    <option value="">Select a payment method</option>
    <option value="Credit Card">Credit Card</option>
    <option value="Debit Card">Debit Card</option>
    <option value="PayPal">PayPal</option>
    <option value="Bank Transfer">Bank Transfer</option>
    <option value="Check">Check</option>
    <option value="Mobile Payment (Apple Pay, Google Wallet)">Mobile Payment (Apple Pay, Google Wallet)</option>
  </select>
  {formik.errors.paymentMethod && (
    <div className="text-red-500 text-xs italic mt-2">
      {formik.errors.paymentMethod}
    </div>
  )}
</div>


        <div className="mb-4">
          <label
            htmlFor="quickAccess"
            className="block text-gray-300 font-bold mb-2"
          >
            17. Quick access enabled?
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

        <h2 className={`${styles.heading2} mb-6 text-white`}>Hobbies</h2>

        <div className="mb-4">
          <label
            htmlFor="hobbies"
            className="block text-gray-300 font-bold mb-2"
          >
            18. Hobbies and interests:
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

        <h2 className={`${styles.heading2} mb-6 text-white`}>Feedback</h2>

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
            20. Expectations from us:
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
            21. How can we improve your experience?
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
          Privacy and Terms
        </h2>

        <div className="mb-4">
          <label
            htmlFor="termsAgree"
            className="block text-gray-300 font-bold mb-2"
          >
            22. Do you agree to the terms and conditions?
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
            23. Any privacy concerns:
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

        <div className="mb-4">
          <label
            htmlFor="additionalComments"
            className="block text-gray-300 font-bold mb-2"
          >
            24. Additional comments:
          </label>
          <input
            id="additionalComments"
            name="additionalComments"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.additionalComments}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-600"
          />
          {formik.errors.additionalComments ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.additionalComments}
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSetupForm;
