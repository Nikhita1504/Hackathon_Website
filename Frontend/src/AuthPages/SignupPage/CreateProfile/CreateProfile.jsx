import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './CreateProfile.scss'; // Import normal CSS
import Usercontext from "../../../Context/Usercontext";
import Select from "react-select";
import { handleError, handleSucess } from "../../../Utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import skillOptions from '../../../Utils/Skillsoption'

const currentYear = new Date().getFullYear();
const graduationYears = [
  currentYear,
  currentYear + 1,
  currentYear + 2,
  currentYear + 3,
  currentYear + 4,
];

function CreateProfile() {

  const navigate = useNavigate();
  const { Userinfo, SetUserinfo } = useContext(Usercontext);

  const selectedOptions = (Userinfo.skills || []).map((skill) => ({
    value: skill.toLowerCase(),
    label: skill,
  }));

  const handlechange = (e) => {
    const { name, value } = e.target;
    const copyinfo = { ...Userinfo };
    copyinfo[name] = value;
    SetUserinfo(copyinfo);
  };

  const handlesubmit = async(e) => {
    e.preventDefault();
    try {
      const URL = `http://localhost:3000/profile/${Userinfo.email}`
      const body = Userinfo;
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const { message, err, success } = await response.json();
      if (success) {
        handleSucess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        if (err) {
          handleError(err);
        } else {
          handleError(message);
        }
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleSkillsChange = (selectedOptions) => {
    const skills = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    SetUserinfo({ ...Userinfo, skills });
  };

  return (
    <>
      <div className="profilecreation-container"> {/* Use className without CSS modules */}
        <form className="profilecreation-form" onSubmit={handlesubmit}>
          <h1 className="h1">Create your Profile</h1>
          <div>
            <label className="label" htmlFor="college">
              College
            </label>
            <select
              name="college"
              required
              value={Userinfo.college||""}
              onChange={handlechange}
            >
              <option value="" disabled>Select college</option>
              <option value="LNCT">LNCT</option>
              <option value="LNCTS">LNCTS</option>
              <option value="LNCTE">LNCTE</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="degree">
              Degree
            </label>
            <select
              name="degree"
              required
              value={Userinfo.degree || ""}
              onChange={handlechange}
            >
              <option value="" disabled>Select degree</option>
              <option value="CSE">CSE</option>
              <option value="AIML">AIML</option>
              <option value="AIDS">AIDS</option>
              <option value="IOT">IOT</option>
              <option value="EE">EE</option>
              <option value="EC">EC</option>
              <option value="ME">ME</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="GraduationYear">
              Graduation Year
            </label>
            <select
              name="GraduationYear"
              required
              value={Userinfo.GraduationYear || ""}
              onChange={handlechange}
            >
              <option value="" disabled>Select Graduation Year</option>
              {graduationYears.map((year) => {
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="skills">Skills</label>
            <Select
              isMulti
              name="skills"
              options={skillOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSkillsChange}
              defaultValue={selectedOptions}
            />
          </div>
          <div>
            <label className="label" htmlFor="bio">Bio</label>
            <textarea
              className="input"
              value={Userinfo.bio || ""}
              placeholder="Enter your bio (max 500 characters)"
              name="bio"
              maxLength="500"
              onChange={handlechange}
            ></textarea>
          </div>
          <div>
            <label className="label" htmlFor="githubProfile">GitHub Profile</label>
            <input
            required
              className="input"
              value={Userinfo.githubProfile || ""}
              type="url"
              placeholder="Enter GitHub profile URL"
              name="githubProfile"
              onChange={handlechange}
            />
          </div>
          <div>
            <label className="label" htmlFor="linkedinProfile">LinkedIn Profile</label>
            <input
            required
              className="input"
              value={Userinfo.linkedinProfile || ""}
              type="url"
              placeholder="Enter LinkedIn profile URL"
              name="linkedinProfile"
              onChange={handlechange}
            />
          </div>
          <button type="submit" onClick={handlesubmit}>Save Profile</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default CreateProfile;
