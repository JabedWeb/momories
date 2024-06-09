// import { makeStyles } from "@material-ui/core/styles";

// export default makeStyles((theme) => ({
//   media: {
//     borderRadius: '20px',
//     objectFit: 'cover',
//     width: '100%',
//     maxHeight: '600px',

//   },
//   card: {
//     display: 'flex',
//     width: '100%',
//     [theme.breakpoints.down('sm')]: {
//       flexWrap: 'wrap',
//       flexDirection: 'column',
//     },
//   },
//   section: {
//     borderRadius: '20px',
//     margin: '10px',
//     flex: 1,
//   },
//   imageSection: {
//     marginLeft: '20px',
//     [theme.breakpoints.down('sm')]: {
//       marginLeft: 0,
//     },
//   },
//   recommendedPosts: {
//     display: 'flex',
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: 'column',
//     },
//   },
//   loadingPaper: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '20px',
//     borderRadius: '15px',
//     height: '39vh',
//   },
//   commentsOuterContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   commentsInnerContainer: {
//     height: '200px',
//     overflowY: 'auto',
//     marginRight: '30px',
//   },
// }));

import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    borderRadius: "15px",
    margin: "20px 0",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  section: {
    flex: 1,
    margin: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  tags: {
    marginBottom: theme.spacing(2),
  },
  tagButton: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: "#e0e0e0",
    "&:hover": {
      backgroundColor: "#bdbdbd",
    },
  },
  message: {
    marginBottom: theme.spacing(2),
  },
  creatorLink: {
    textDecoration: "none",
    color: "#3f51b5",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  imageSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: "auto",
    borderRadius: "15px",
    boxShadow: theme.shadows[3],
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  recommendedPosts: {
    display: "flex",
    flexDirection: "column",
  },
  recommendedPost: {
    cursor: "pointer",
    marginBottom: theme.spacing(2),
    "&:hover img": {
      transform: "scale(1.1)",
    },
  },
  recommendedPostImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    transition: "transform 0.2s ease-in-out",
  },
}));
