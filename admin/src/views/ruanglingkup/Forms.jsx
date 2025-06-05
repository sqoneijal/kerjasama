import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const Forms = () => {
   const [state, setState] = useState({
      isLoading: true,
      isSubmit: false,
   });

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   return (
      <Form onSubmit={handleSubmit} disabled={state.isSubmit}>
         <Card className="shadow-sm">
            <Card.Body>
               <Row>
                  <Col></Col>
               </Row>
            </Card.Body>
            <Card.Footer>
               <Button variant="primary" className="fw-bold" size="sm" type="submit" disabled={state.isSubmit}>
                  {state.isSubmit ? "Loading..." : `Simpan`}
               </Button>
            </Card.Footer>
         </Card>
      </Form>
   );
};
export default Forms;
