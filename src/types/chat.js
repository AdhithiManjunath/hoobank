// Import image assets
import UserOne from "../images/user/user-01.png";
import UserTwo from "../images/user/user-02.png";
import UserThree from "../images/user/user-03.png";
import UserFour from "../images/user/user-04.png";
import UserFive from "../images/user/user-05.png";

/**
 * @typedef {Object} Chat
 * @property {string} avatar - URL or path to the avatar image
 * @property {string} name - Name of the chat participant
 * @property {string} text - Message text
 * @property {number} time - Timestamp of the message
 * @property {number} textCount - Number of characters in the message
 * @property {string} color - Color associated with the chat message (e.g., background color)
 */

/**
 * Example chat data
 * @type {Chat[]}
 */
const chatData = [
  {
    avatar: UserOne,
    name: "Devid Heilo",
    text: "How are you?",
    time: 12,
    textCount: 3,
    color: "#10B981",
  },
  {
    avatar: UserTwo,
    name: "Henry Fisher",
    text: "Waiting for you!",
    time: 12,
    textCount: 0,
    color: "#DC3545",
  },
  {
    avatar: UserFour,
    name: "Jhon Doe",
    text: "What's up?",
    time: 32,
    textCount: 0,
    color: "#10B981",
  },
  {
    avatar: UserFive,
    name: "Jane Doe",
    text: "Great",
    time: 32,
    textCount: 2,
    color: "#FFBA00",
  },
  {
    avatar: UserOne,
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 0,
    color: "#10B981",
  },
  {
    avatar: UserThree,
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 3,
    color: "#FFBA00",
  },
];

export default chatData;
