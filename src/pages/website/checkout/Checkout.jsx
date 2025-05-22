import { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import ShowDataCheck from "./ShowDataCheck";

function Checkout() {
  const [form, setForm] = useState({
    full_name: "",
    address: "",
    country: "",
    phone: "",
  });

  const [show, setShow] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const egyptGovernorates = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Dakahlia",
    "Red Sea",
    "Beheira",
    "Fayoum",
    "Gharbia",
    "Ismailia",
    "Menoufia",
    "Minya",
    "Qalyubia",
    "New Valley",
    "Suez",
    "Aswan",
    "Assiut",
    "Beni Suef",
    "Port Said",
    "Damietta",
    "Sharqia",
    "South Sinai",
    "Kafr El Sheikh",
    "Matrouh",
    "Luxor",
    "Qena",
    "North Sinai",
    "Sohag",
  ];

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSub(e) {
    e.preventDefault();
    setShow(true);
    setIsSubmit(true);
  }

  const showOptions = egyptGovernorates.map((item, key) => (
    <option key={key} value={item}>
      {item}
    </option>
  ));

  return (
    <>
      {show && (
        <Alert
          className="bg-success position-fixed top-0 w-100"
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading className="mb-0 text-white text-center">
            Your Order Completed, You Will Recieve it Soon...
          </Alert.Heading>
        </Alert>
      )}

      <Container className="mb-2">
        <ShowDataCheck />

        <Form onSubmit={handleSub}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name..."
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Address..."
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country:</Form.Label>
            <Form.Select
              aria-label="country"
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Your Country...
              </option>
              {showOptions}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ex: 01012345678"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              pattern="^01[0-2,5]{1}[0-9]{8}$"
              required
            />
          </Form.Group>

          <button className="btn btn-primary" disabled={isSubmit}>
            Send Order
          </button>
        </Form>
      </Container>
    </>
  );
}

export default Checkout;
