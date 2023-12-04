import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./styles/App.css";

function App() {
  const [data, setdata] = useState([]);
  const Url = "https://653526a9c620ba9358ec3537.mockapi.io/UserDetail/";
  const formRef = useRef();
  const buttonRef = useRef();
  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [phone, setphone] = useState("");
  const [website, setwebsite] = useState("");
  const [streets, setstreets] = useState("");
  const [city, setcity] = useState("");
  const [area, setarea] = useState("");
  const [pin, setpin] = useState("");
  const [cname, setcname] = useState("");
 // Display form for adding/editing profiles
  function displayForm() {
    // Toggle display of form and button
    formRef.current.style.display = "block";
    (formRef.current.style.display = "block")
      ? (buttonRef.current.style.display = "none")
      : (buttonRef.current.style.display = "block");
  }
   // Function to fetch data from the API
  async function fetchData() {
    try {
      setdata(await axios.get(Url).then((response) => response.data));
    } catch (error) {
      console.log("Error is : " + error);
    }
  }
  // Fetch data on initial render
  useEffect(() => {
    fetchData();
  }, []);
// Functions for editing/deleting profile data
  async function editData(id, datas) {
    formRef.current.style.display = "block";
    buttonRef.current.style.display = "none";
    console.log(datas.name, id);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setname(datas.name);
    setmail(datas.email);
    setphone(datas.phone);
    setwebsite(datas.website);
    setstreets(datas.address.street);
    setcity(datas.address.city);
    setarea(datas.address.suite);
    setpin(datas.address.zipcode);
    setcname(datas.company.name);
  }
  async function deleteData(id) {
    const ddata = await axios
      .delete(Url + id)
      .then((response) => response.data);

    fetchData();
  }
  async function onSubmit() {
    if (!name ||!phone || !mail) {
      alert("Name, Phone, Mail is requires.")
    } else {
      event.preventDefault();
    const newdata = {
      name: name,
      email: mail,
      address: {
        street: streets,
        suite: area,
        city: city,
        zipcode: pin,
      },
      phone: phone,
      website: website,
      company: {
        name: cname,
      },
    };
    if (editMode) {
      await axios
      .put(Url + selectedId, newdata) // Assuming your API supports PUT for updates
      .then((response) => response.data)
      .then((data) => console.log("data updated successfully..."));
  } else {
    // Otherwise, create a new profile
    await axios
      .post(Url, newdata)
      .then((response) => response.data)
      .then((data) => console.log("data added successfully..."));
  }

  // Reset form and fetch updated data
  resetForm();
  fetchData();
  formRef.current.style.display = "none";
  buttonRef.current.style.display = "block";

 }
}

// State variables for managing edit mode and selected ID
const [editMode, setEditMode] = useState(false);
const [selectedId, setSelectedId] = useState(null);

async function editData(id, datas) {
formRef.current.style.display = "block";
buttonRef.current.style.display = "none";

setEditMode(true); 
setSelectedId(id); 

// Populate form fields with existing data
setname(datas.name);
setmail(datas.email);
setphone(datas.phone);
setwebsite(datas.website);
setstreets(datas.address.street);
setcity(datas.address.city);
setarea(datas.address.suite);
setpin(datas.address.zipcode);
setcname(datas.company.name);
}

// Function to reset form fields and states
function resetForm() {
setname("");
setmail("");
setphone("");
setwebsite("");
setstreets("");
setcity("");
setarea("");
setpin("");
setcname("");

setEditMode(false);
setSelectedId(null);
}
// Logic for displaying the scroll-to-top button
const [showScrollButton, setShowScrollButton] = useState(false);
 // Function to scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 // Effect to show/hide the scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 300;
      setShowScrollButton(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className="container main ">
      {/* head */}
      {showScrollButton && (
        <button
          className="btn btn-primary btn-floating"
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
          }}
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
      <div className="">
        <h1 className="py-5  text-center text-warning">PROFILE CARDS</h1>
        <div className="container w=100 form" ref={formRef}>
            <form>
              <div className="d-md-flex w-100 ip">
                <div className="w-50 d-flex flex-column m-3 ">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className=""
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="w-50 d-flex flex-column m-3 ">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className=" "
                    value={mail}
                    onChange={(e) => setmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-md-flex w-sm-75">
                <div className="w-50 d-flex flex-column m-3">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="phone"
                    name="phone"
                    className=""
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>

                <div className="w-50 d-flex flex-column m-3">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    name="website"
                    className=""
                    value={website}
                    onChange={(e) => setwebsite(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <div className="d-md-flex w-sm-75">
                  <div className="w-50 d-flex flex-column m-3">
                    <label htmlFor="street">Street :</label>
                    <input
                      type="text"
                      name="street"
                      className="mb-3"
                      value={streets}
                      onChange={(e) => setstreets(e.target.value)}
                    />
                    <label htmlFor="area">Area :</label>
                    <input
                      type="text"
                      name="area"
                      className=""
                      value={area}
                      onChange={(e) => setarea(e.target.value)}
                    />
                  </div>
                  <div className="w-50 d-flex flex-column m-3">
                    <label htmlFor="city">City :</label>
                    <input
                      type="text"
                      name="city"
                      className="mb-3"
                      value={city}
                      onChange={(e) => setcity(e.target.value)}
                    />
                    <label htmlFor="pincode">Pincode :</label>
                    <input
                      type="text"
                      name="pincode"
                      className=""
                      value={pin}
                      onChange={(e) => setpin(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="company">Company Detail </label>
                <div className="w-50 d-flex flex-column m-3">
                  <label htmlFor="cName">Company Name : </label>
                  <input
                    type="text"
                    name="cName"
                    className=""
                    value={cname}
                    onChange={(e) => setcname(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
      <button
        type="submit"
        className="btn btn-success mx-1 w-auto"
        onClick={onSubmit}
      >
        Submit
      </button>
      <button
        type="button"
        className="btn btn-danger mx-1 w-auto"
        onClick={() => {
          formRef.current.style.display = "none";
          buttonRef.current.style.display = "block";
          // Clear input values if needed
          setname("");
          setmail("");
          setphone("");
          setwebsite("");
          setstreets("");
          setcity("");
          setarea("");
          setpin("");
          setcname("");
        }}
      >
        Cancel
      </button>
    </div>
  </form>
</div>
        <div ref={buttonRef}>
          <button onClick={displayForm} className="btn btn-info mx-1 w-auto">
            Add Profile
          </button>
        </div>
        <div className="mt-5">
          {/* card section */}
          <div className="row">
            {data.map((datas) => (
              <div className=" col-md-6 col-lg-4 py-3 " key={datas.id}>
                <div className="card rounded p-3 cardimg">
                  <div className="card-body ">
                    <h3>{datas.name}</h3>
                    <div className="text-start my-3">
                      <h6>
                        <b>Company :</b> {datas.company.name}
                      </h6>
                      <p>
                        <b>Email : </b>
                        {datas.email}
                      </p>
                      <p>
                        <b>Phone :</b> {datas.phone}
                      </p>
                      <p>
                        <b>Website :</b>
                        <a href="#"> {datas.website}</a>
                      </p>
                      <p>
                        <b>Address : </b>
                        {`${datas.address.street},${datas.address.street},${datas.address.city}. PIN -${datas.address.zipcode}`}
                      </p>
                    </div>
                    <button
                      className="btn btn-primary mx-1 w-auto"
                      onClick={() => editData(datas.id, datas)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-primary mx-1 w-auto"
                      onClick={() => deleteData(datas.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;