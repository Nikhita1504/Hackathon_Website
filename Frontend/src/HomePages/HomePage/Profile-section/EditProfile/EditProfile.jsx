import React, { useContext, useEffect, useState } from "react";
import "./editprofile.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import skillOptions from "./../../../../utils/Skillsoption";
import Usercontext from "../../../../Context/Usercontext";
import Select from "react-select";

const EditProfile = () => {
  const { Userinfo, SetUserinfo } = useContext(Usercontext);

  const branch = ["CSE", "AIML", "AIDS", "IoT", "ME", "CE", "EC", "EE"];
  const colleges = ["LNCT", "LNCTS", "LNCTE", "LNCTU"];
  const currentYear = new Date().getFullYear();
  const graduationYears = [
    currentYear,
    currentYear + 1,
    currentYear + 2,
    currentYear + 3,
    currentYear + 4,
  ];

  const selectedOptions = (Userinfo.skills || []).map((skill) => ({
    value: skill.toLowerCase(),
    label: skill,
  }));

  const handleSkillsChange = (selectedOptions) => {
    const skills = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    SetUserinfo({ ...Userinfo, skills });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUserinfo({ ...Userinfo, [name]: value });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = jwtDecode(token);

    const fetchuserdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/home/userdata/${user.email}`
        );
        SetUserinfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchuserdata();
  }, [SetUserinfo]);

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      const user = jwtDecode(token);

      await axios.put(
        `http://localhost:3000/profile/edit-profile/${user.email}`,
        Userinfo
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="edit-container">
        <h3>Edit Your Profile</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={Userinfo.name || ""}
            onChange={handleChange}
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            value={Userinfo.email || ""}
            onChange={handleChange}
            disabled
          />

          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            cols="30"
            rows="10"
            value={Userinfo.bio || ""}
            onChange={handleChange}
          />

          <label htmlFor="college">College</label>
          <select
            name="college"
            value={Userinfo.college || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your college
            </option>
            {colleges.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>

          <label htmlFor="branch">Branch</label>
          <select
            name="degree"
            value={Userinfo.degree || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your branch
            </option>
            {branch.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>

          <label htmlFor="year">Graduation Year</label>
          <select
            name="GraduationYear"
            value={Userinfo.GraduationYear || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Graduation Year
            </option>
            {graduationYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <label htmlFor="skills">Skills</label>
          <Select
            isMulti
            name="skills"
            options={skillOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSkillsChange}
            value={selectedOptions}
          />

          <label htmlFor="github">GitHub</label>
          <input
            type="text"
            name="githubProfile"
            value={Userinfo.githubProfile || ""}
            onChange={handleChange}
          />

          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="text"
            name="linkedinProfile"
            value={Userinfo.linkedinProfile || ""}
            onChange={handleChange}
          />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
