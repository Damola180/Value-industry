import React from "react";
export default function AddProduct() {
  const [formData, setFormData] = React.useState({
    brand: "",
    deliveryOpt: "",
    imgUrl: "",
    price: "",
    productName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      brand: "",
      deliveryOpt: "",
      imgUrl: "",
      price: "",
      productName: "",
    });
  };
  return (
    <div className="admin-Nav_Outlet-content">
      <form onSubmit={handleSubmit}>
        {/* Other form fields */}

        <label>
          ProductName:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
        </label>

        <label>
          imgUrl:
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
          />
        </label>

        <label>
          Brand:
          <select name="brand" value={formData.brand} onChange={handleChange}>
            <option value="">Select Brand</option>
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
            {/* Add more options as needed */}
          </select>
        </label>

        <label>
          Delivery Option:
          <select
            name="deliveryOpt"
            value={formData.deliveryOpt}
            onChange={handleChange}
          >
            <option value="">Select Delivery Option</option>
            <option value="Pick up station">Pick up station</option>
            <option value="at your doorstep">at your doorstep</option>
            {/* Add more options as needed */}
          </select>
        </label>

        <label>
          Price ($):
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="10"
          />
        </label>

        <button className="admin-submit" type="submit">
          Add the product
        </button>
      </form>
    </div>
  );
}
