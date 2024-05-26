import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPostsByDate, getPostsBySearch} from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination/Paginate";
import { useLocation, useHistory } from "react-router-dom";
import useStyles from "./styles";
import ChipInput from "material-ui-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [sort, setSort] = useState('asc');
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    const searchParams = {
      search: search.trim() || "none",
      tags: tags.length ? tags.join(",") : "",
      sort,
    };

   // if (searchParams.search === "none" && !searchParams.tags) return;

    console.log(searchParams);

    dispatch(getPostsBySearch(searchParams));
    history.push(
      `/posts/search?searchQuery=${searchParams.search}&tags=${searchParams.tags}&sort=${searchParams.sort}`
    );
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (deleteTag) => {
    setTags(tags.filter((tag) => tag !== deleteTag));
  };

  // const handleSortChange = (e) => {
  //   setSort(e.target.value);
  //   console.log(e.target.value,"sort");
  //   dispatch(getPostsByDate({ sort: e.target.value }));
  //   history.push(`/posts/sort?sort=${e.target.value}`);
  // };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="sort-label">Sort By Date</InputLabel>
              <Select
                labelId="sort-label"
                id="sort"
                value={sort}
                onChange={handleSortChange}
                label="Sort By Date"
              >
                <MenuItem value="desc">Descending</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
              </Select>
            </FormControl> */}
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                variant="outlined"
                label="Search Tags"
                value={tags}
                onAdd={handleAdd}
               onDelete={handleDelete}
              />
              <InputLabel id="sort-label">Sort By Date</InputLabel>
              <Select
                labelId="sort-label"
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                label="Sort By Date"
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
              <Button
                onClick={searchPost}
                color="primary"
                className={classes.searchButton}
                variant="contained"
              >
                Search Post
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={8} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
