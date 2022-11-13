import { FieldArray, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";

interface StepsProps {
  errors: any;
  values: { stepNumber: string; description: string; photo: string }[];
  handleChange: any;
}

const Steps = ({ errors, values, handleChange }: StepsProps) => {
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    console.log("test");
  });
  return (
    <FieldArray
      name="steps"
      render={({ insert, remove }) => (
        <div>
          <Form.Group className="mb-4">
            <Form.Label className="bold">Przygotowanie</Form.Label>
            {values.map((value, index) => (
              <div key={index}>
                <Row className="align-items-start pt-3">
                  <Col xs="12">
                    <Form.Label>Krok {index + 1}</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      placeholder="Opisz krok"
                      name={`steps.${index}.description`}
                      value={values[index].description}
                      onChange={handleChange}
                      isInvalid={
                        errors && errors[index] && !!errors[index].description
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors && errors[index] && errors[index].description}
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs={12} md="auto">
                    <Row className="pt-2 pt-md-0">
                      <Col xs="auto" className="ms-auto">
                        <Button variant="success">Dodaj zdjęcie</Button>
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="link"
                          className="px-0"
                          onClick={() => values.length > 1 && remove(index)}
                        >
                          <BsTrashFill
                            style={{ fontSize: "22px" }}
                            className="text-danger"
                          />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            ))}
          </Form.Group>
          <div className="d-flex">
            <Button
              variant="success"
              className="ms-auto"
              onClick={() =>
                insert(values.length + 1, {
                  stepNumber: values.length + 1,
                  description: "",
                  photo: "",
                })
              }
            >
              Dodaj krok
            </Button>
          </div>
        </div>
      )}
    />
    //   <div>
    //     <Form.Group className="mb-4">
    //       <Form.Label className="bold">Przygotowanie</Form.Label>
    //       <Row className="align-items-end">
    //         <Col xs="12">
    //           <Form.Label>Krok 1</Form.Label>
    //         </Col>
    //         <Col>
    //           <Form.Control
    //             as="textarea"
    //             rows={1}
    //             placeholder="Opisz krok"
    //             name=""
    //             // value={values.email}
    //             // onChange={handleChange}
    //             // isInvalid={!!errors.email}
    //           />
    //           {/* <Form.Control.Feedback type="invalid">
    //   {errors.email}
    // </Form.Control.Feedback> */}
    //         </Col>
    //         <Col xs={12} md="auto">
    //           <Row className="pt-2 pt-md-0">
    //             <Col xs="auto" className="ms-auto">
    //               <Button variant="success">Dodaj zdjęcie</Button>
    //             </Col>
    //             <Col xs="auto">
    //               <Button variant="link" className="px-0">
    //                 <BsTrashFill
    //                   style={{ fontSize: "22px" }}
    //                   className="text-danger"
    //                 />
    //               </Button>
    //             </Col>
    //           </Row>
    //         </Col>
    //       </Row>
    //     </Form.Group>
    //   </div>
  );
};

export default Steps;
