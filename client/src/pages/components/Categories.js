import React from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/router';

function Categories() {
  const router = useRouter();
  const productCategories = [
    "OTC Medicine",
    "Women Choice",
    "Sexual Wellness",
    "Baby Care",
    "Dental care",
    "Prescription Medicine",
  ];

  return (
    <div>
      {productCategories.map((item) => {
        const isActive = router.query.category === item;
        const categoryStyle = {
          cursor: 'pointer',
          fontWeight: isActive ? 'bold' : 'normal', 
        };

        return (
          <Card>
          <p
            key={item}
            style={categoryStyle}
            onClick={() => router.push(`/category?category=${item}`)}
          >
            {item}
          </p>
          </Card>
        );
      })}
    </div>
  );
}

export default Categories;
