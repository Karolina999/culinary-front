import React from "react";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";

const Category = () => {
  const category = [
    "Śniadania",
    "Zupy",
    "Sałatki",
    "Ciasta",
    "Desery",
    "Makarony",
    "Dania główne",
    "Kolacje",
    "Inne",
  ];
  const colors = [
    "#97EDED",
    "#EB8787",
    "#B8D7B7",
    "#ED97E9",
    "#97A8ED",
    "#F5F799",
    "#CAB1FF",
    "#EDB697",
    "#CAE383",
  ];
  return (
    <Container className="pt-5 mt-5 mb-3">
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          flexWrap: "wrap",
          maxWidth: "900px",
        }}
        className="mx-auto"
      >
        {category.map((category, index) => (
          <div
            className="mx-auto px-2 cursor-pointer"
            onClick={() => console.log("click")}
          >
            <div
              style={{
                height: "150px",
                width: "150px",
                background: colors[index],
              }}
              className="rounded-circle m-auto"
            >
              <div className="d-flex justify-content-center my-auto">
                <Image
                  src={`/category/${index}.svg`}
                  alt="Picture of the author"
                  width={110}
                  height={110}
                  // style={index == 0 { mixBlendMode: "darken" }}
                  className={`my-4 ${
                    (index === 0 || index === 4) && "bledMultiply"
                  }`}
                />
              </div>
            </div>
            <h5 className="caladea-font text-center bold mt-3">{category}</h5>
          </div>
        ))}
      </div>
      {/* <Row>
        {category.map((category, index) => (
          <Col className="mx-auto border">
            <div
              style={{ height: "150px", width: "150px" }}
              className="bg-dark rounded-circle mx-auto"
            ></div>
            <h5 className="caladea-font text-center bold mt-3">Makron</h5>
          </Col>
        ))}
      </Row> */}
    </Container>
  );
};

export default Category;
