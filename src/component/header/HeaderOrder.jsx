import {ExpandMore, ShoppingCartOutlined} from "@mui/icons-material";
import {
    Badge,
    Container,
    IconButton,
    InputBase,
    Stack,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const Search = styled("div")(({ theme }) => ({
    flexGrow: 0.4,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #777",
    "&:hover": {
        border: "1px solid #333",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "266px",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "330px",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#777",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));
const HeaderOrder = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container sx={{my: 3, display:"flex", justifyContent:"space-between"}}>
            <Stack alignItems={"center"}>
                <ShoppingCartOutlined />
                <Typography variant="body2">E-commerce</Typography>
            </Stack>

            <Search sx={{
                borderRadius: "22px"
            }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />

                <div>
                    <List
                        component="nav"
                        aria-label="Device settings"
                        sx={{
                            // @ts-ignore
                            borderBottomRightRadius: 22,
                            borderTopRightRadius: 22,
                            p: "0",
                        }}
                    >
                        <ListItem
                            id="lock-button"
                            aria-haspopup="listbox"
                            aria-controls="lock-menu"
                            aria-label="when device is locked"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClickListItem}
                        >
                            <ListItemText
                                // className="border"
                                sx={{
                                    width: 93,
                                    textAlign: "center",
                                    "&:hover": { cursor: "pointer" },
                                }}

                            />
                            <ExpandMore sx={{ fontSize: "16px" }} />
                        </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "lock-button",
                            role: "listbox",
                        }}
                    >

                        <MenuItem
                            sx={{ fontSize: "13px" }}

                        >

                        </MenuItem>

                    </Menu>
                </div>

            </Search>

            <Stack direction={"row"} alignItems={"center"}>
                <IconButton aria-label="cart">
                    <Badge badgeContent={4} color="primary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>

                <IconButton>
                    <Person2OutlinedIcon />
                </IconButton>
            </Stack>

        </Container>
    )
}

export default HeaderOrder;

