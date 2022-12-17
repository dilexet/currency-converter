import { Box, Typography } from "@mui/material";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <Box className={styles.notfound_main}>
      <Box className={styles.notfound}>
        <Box className={styles.notfound_404}>
          <Typography component="h3" className={styles.notfound_title}>
            Oops! Page not found
          </Typography>
          <Typography component="h1" className={styles.notfound_title}>
            <span className={styles.text_shadow}>4</span>
            <span className={styles.text_shadow}>0</span>
            <span className={styles.text_shadow}>4</span>
          </Typography>
        </Box>
        <Typography component="h2" className={styles.notfound_description}>
          we are sorry, but the page you requested was not found
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
