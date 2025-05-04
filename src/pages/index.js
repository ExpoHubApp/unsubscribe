export async function getServerSideProps() {
    return {
      redirect: {
        destination: '/unsubscribe',
        permanent: false, // set to true if you want it cached by browsers
      },
    };
  }
  
  export default function RedirectPage() {
    return null;
  }
  