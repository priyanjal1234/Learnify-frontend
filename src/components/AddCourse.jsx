import React, { useContext } from "react";
import FormFieldWithoutIcon from "./FormFieldWithoutIcon";
import { ThemeDataContext } from "../context/ThemeContext";
import courseSchema from "../schemas/courseSchema";
import { toast } from "react-toastify";
import courseService from "../services/Course";

const AddCourse = ({
  addCourseData,
  setaddCourseData,
  errors,
  seterrors,
  setShowAddCourse,
  refetch
}) => {
  const { darkMode } = useContext(ThemeDataContext);

  const containerStyles = {
    backgroundColor: darkMode ? "#1F2937" : "#ffffff",
    color: darkMode ? "#F3F4F6" : "#1F2937",
  };

  const inputStyles = {
    backgroundColor: darkMode ? "#374151" : "#F9FAFB",
    borderColor: darkMode ? "#4B5563" : "#D1D5DB",
    color: darkMode ? "#E5E7EB" : "#1F2937",
  };

  function handleAddCourseChange(e) {
    let { name, value } = e.target;
    setaddCourseData((prev) => ({ ...prev, [name]: value }));

    try {
      courseSchema.pick({ [name]: true }).parse({ [name]: value });
      seterrors((prev) => ({ ...prev, [name]: null }));
    } catch (error) {
      if (error.errors) {
        const errorMessage = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        seterrors(errorMessage);
      }
    }
  }

  async function handleCreateCourse(e) {
    e.preventDefault();

    const parsedData = courseSchema.safeParse(addCourseData);
    if (!parsedData.success) {
      const firstError = parsedData.error.issues[0]?.message;
      toast.error(firstError);
      return;
    }

    try {
      await courseService.createCourse(addCourseData);
      toast.success("Course Created Successfully");
      setShowAddCourse(false);
      refetch()
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        className="rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
        style={containerStyles}
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleCreateCourse} className="space-y-6">
          <FormFieldWithoutIcon
            label="Course Title"
            type="text"
            placeholder="Write Course Title"
            name="title"
            value={addCourseData.title}
            handleChange={handleAddCourseChange}
            error={errors.title}
            inputStyles={inputStyles}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={addCourseData.description}
              onChange={handleAddCourseChange}
              placeholder="Write Course Description"
              rows={4}
              className="w-full px-4 py-2 resize-none border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              style={inputStyles}
            />
            {errors.description && (
              <p className="text-red-500 mt-2">{errors.description}</p>
            )}
          </div>

          {/* Category & Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldWithoutIcon
              label="Category"
              type="text"
              placeholder="e.g., Programming"
              name="category"
              value={addCourseData.category}
              handleChange={handleAddCourseChange}
              error={errors.category}
              inputStyles={inputStyles}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                name="level"
                value={addCourseData.level}
                onChange={handleAddCourseChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                style={inputStyles}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {errors.level && (
                <p className="text-red-500 mt-2">{errors.level}</p>
              )}
            </div>
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ₹
              </span>
              <input
                type="number"
                name="price"
                value={addCourseData.price}
                onChange={handleAddCourseChange}
                className="w-full pl-8 pr-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                style={inputStyles}
              />
            </div>
            {errors.price && (
              <p className="text-red-500 mt-2">{errors.price}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowAddCourse(false)}
              className="px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100"
              style={{
                backgroundColor: darkMode ? "#374151" : "#E5E7EB",
                color: darkMode ? "#F3F4F6" : "#1F2937",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
