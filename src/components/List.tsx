import Image from "next/image";
import styles from "./List.module.css";
import downLogo from "../img/down.svg";
import { useState } from "react";
const product = [
  {
    id: 1,
    title: "Web site for Tash Building",
    company: "Building Company",
    time: "30 days",
  },
  {
    id: 2,
    title: "Web site for Tash Building",
    company: "Building Company",
    time: "30 days",
  },
  {
    id: 3,
    title: "Web site for Tash Building",
    company: "Building Company",
    time: "30 days",
  },
  {
    id: 4,
    title: "Web site for Tash Building",
    company: "Building Company",
    time: "30 days",
  },
  {
    id: 5,
    title: "Web site for Tash Building",
    company: "Building Company",
    time: "30 days",
  },
  {
    id: 6,
    title: "Web site for Tash Building",
    company: "Building Company",
    time: "30 days",
  },
  {
    id: 7,
    title: "Web site for Tash Building",
    company: "Building Company",
    time: "30 days",
  },
  {
    id: 8,
    title: "Web site for Tash Building",
    company: "Building Company",
    time: "30 days",
  },
  {
    id: 9,
    title: "Web site for Tash Building",
    company: "Building Company",
    time: "30 days",
  },
  {
    id: 10,
    title: "Web site for Tash Building",
    company: "Building Company",
    time: "30 days",
  },
];
const List: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return (
    <div className={styles.list_container}>
      {product.map((item) => {
        return (
          <>
            <div className={styles.list}>
              <div className={styles.num}>
                {item.id < 10 ? `0${item.id}` : item.id}{" "}
              </div>
              <h2 className={styles.title}>{item.title}</h2>{" "}
              <p className={styles.company}>{item.company}</p>
              <div>
                <p className={styles.time}>{item.time}</p>
              </div>
              <Image
                className={styles.toggleImage}
                src={downLogo}
                alt=""
                onClick={() => handleToggle(item.id)}
              />
            </div>

            <div
              className={`${styles.additionalInfo} ${
                expandedId === item.id ? styles.expanded : ""
              }`}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim,
                odio ex. Harum suscipit, dolore voluptate, sit deserunt, maiores
                ratione ipsum est beatae deleniti architecto voluptatibus qui
                dignissimos in accusamus nemo! Accusamus similique quibusdam
                suscipit libero sed amet quaerat et dolorem dignissimos facere
                laudantium nemo quam officiis, voluptatibus dolores
                reprehenderit corporis necessitatibus eius exercitationem error
                labore totam? Porro illo maxime fugit. Ab reiciendis sequi ea
                assumenda distinctio, eum ullam facere quaerat sit at eos. Quo,
                consequatur amet necessitatibus fugit quis incidunt fuga!
                Blanditiis iure eos accusamus ratione delectus quasi, laborum
                aliquam! Id accusamus quo in excepturi delectus, expedita,
                laboriosam illum totam enim, illo quibusdam nam sapiente. Veniam
                temporibus rerum qui quod, voluptate nulla laborum assumenda
                nemo maxime illo veritatis architecto accusamus? Doloremque quod
                numquam optio esse inventore. Maxime temporibus excepturi
                voluptatibus ea culpa quam at. Recusandae molestiae obcaecati
                sunt deserunt doloribus hic labore eligendi accusamus? Obcaecati
                blanditiis omnis dolorum quidem maiores? Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Enim, odio ex. Harum
                suscipit, dolore voluptate, sit deserunt, maiores ratione ipsum
                est beatae deleniti architecto voluptatibus qui dignissimos in
                accusamus nemo! Accusamus similique quibusdam suscipit libero
                sed amet quaerat et dolorem dignissimos facere laudantium nemo
                quam officiis, voluptatibus dolores reprehenderit corporis
                necessitatibus eius exercitationem error labore totam? Porro
                illo maxime fugit. Ab reiciendis sequi ea assumenda distinctio,
                eum ullam facere quaerat sit at eos. Quo, consequatur amet
                necessitatibus fugit quis incidunt fuga! Blanditiis iure eos
                accusamus ratione delectus quasi, laborum aliquam! Id accusamus
                quo in excepturi delectus, expedita, laboriosam illum totam
                enim, illo quibusdam nam sapiente. Veniam temporibus rerum qui
                quod, voluptate nulla laborum assumenda nemo maxime illo
                veritatis architecto accusamus? Doloremque quod numquam optio
                esse inventore. Maxime temporibus excepturi voluptatibus ea
                culpa quam at. Recusandae molestiae obcaecati sunt deserunt
                doloribus hic labore eligendi accusamus? Obcaecati blanditiis
                omnis dolorum quidem maiores? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Enim, odio ex. Harum suscipit,
                dolore voluptate, sit deserunt, maiores ratione ipsum est beatae
                deleniti architecto voluptatibus qui dignissimos in accusamus
                nemo! Accusamus similique quibusdam suscipit libero sed amet
                quaerat et dolorem dignissimos facere laudantium nemo quam
                officiis, voluptatibus dolores reprehenderit corporis
                necessitatibus eius exercitationem error labore totam? Porro
                illo maxime fugit. Ab reiciendis sequi ea assumenda distinctio,
                eum ullam facere quaerat sit at eos. Quo, consequatur amet
                necessitatibus fugit quis incidunt fuga! Blanditiis iure eos
                accusamus ratione delectus quasi, laborum aliquam! Id accusamus
                quo in excepturi delectus, expedita, laboriosam illum totam
                enim, illo quibusdam nam sapiente. Veniam temporibus rerum qui
                quod, voluptate nulla laborum assumenda nemo maxime illo
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default List;
