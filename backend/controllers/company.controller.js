import { resolve } from "styled-jsx/macro";
import { Company } from "../models/company.model.js";

//register company
export const registerCompany = async (res, req) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({ message: "Company name is required" });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({ message: "Company already exists" });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company created successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all companies
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({ message: "No companies found" });
    }
    return res.status(200).json({
      message: "Companies fetched successfully",
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; //company id
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({
      message: "Company fetched successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const updateData = {
      name,
      description,
      website,
      location,
    };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
