import React, {useState, useEffect} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


import { useRouter } from 'next/router';
import Link from 'next/link'
import { useQuery, gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../server/queries';
import Gallery from '../../src/components/product/Gallery'
import Details from '../../src/components/product/Details'
import Info from '../../src/components/product/Info'
import CircularProgress from '@mui/material/CircularProgress';






const Product = () => {
  const [singleProduct, setSingleProduct] = useState(null)
  const slug = useRouter().query.slug;
  
  
  console.log('sluuug is: ', slug)
  const { data, loading, error } = useQuery( GET_PRODUCT, { variables: { slug } } );


  const product = data && data.products.data[0].attributes;
  console.log('single product is: ', product)



  const onCartClick = ( e ) => {
    // e.preventDefault();
    // cartAction.addToCart( product );

    console.log('onCartClick')
}
//===========================STYLES==============================

  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  };
  const containerStyle = {
    marginTop: '1rem',
    minHeight: '100vh',
  };

//================================================================
  return (
    <>
      {!loading ? <Container maxWidth="lg" style={containerStyle} >
        <Grid container spacing={2}>

          <Grid item lg={7} xs={12}>
            <Gallery product={product} />
          </Grid>

          <Grid item lg={5} xs={12}>
            <Details onCartClick={onCartClick} product={product} />
          </Grid>
          <Grid item lg={12} xs={12}>
            <Info product={product} />
          </Grid>
        </Grid>
      </Container> : <Box sx={boxStyle}>
        <CircularProgress />
      </Box>}
    </>
  )
}

export default Product