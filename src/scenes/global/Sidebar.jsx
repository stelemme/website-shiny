import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from "recoil";
import { sidebarToggle } from "../../atoms";

// Sidebar Pro imports
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";

// mui imports
import { tokens } from "../../theme";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import CalculateIcon from '@mui/icons-material/Calculate';
import CatchingPokemonSharpIcon from '@mui/icons-material/CatchingPokemonSharp';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const  setToggled = useSetRecoilState(sidebarToggle);

  return (
    <MenuItem
      rootStyles={{
        ['.' + menuClasses.active]: {
          backgroundColor: colors.primary[900],
        },
      }}
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        navigate(to);
        setToggled(false)
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default function CustomSidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Home");
  const [toggled, setToggled] = useRecoilState(sidebarToggle);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItemStyles = {
    button: {
      '&:hover': {
        backgroundColor: colors.primary[900],
      },
    }
  };

  return (
    <Box style={{ display: 'flex', height: '100%', minHeight: '400px'}}>
      <Sidebar
        transitionDuration="0"
        collapsed={isCollapsed}
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        customBreakPoint="900px"
        backgroundColor={colors.primary[400]}
      >
        <Menu iconShape="square" menuItemStyles={menuItemStyles}>
          <Box>
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed && !toggled ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography
                    variant="h3" color={colors.grey[100]}
                    fontWeight="bold"
                  >
                    Shiny Data
                  </Typography>
                  {!toggled && (
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  )}
                </Box>
              )}
            </MenuItem>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {isCollapsed ? "Counter" : "Counter  Application"} 
            </Typography>
            <Item
              title="Ongoing Counters"
              to="/ongoing-counters"
              icon={<CalculateOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />    
            <Item
              title="Completed Counters"
              to="/completed-counters"
              icon={<CalculateIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {isCollapsed ? "Info" : "Information"} 
            </Typography>
            <Item
              title="Pokédex"
              to="/pokedex"
              icon={<CatchingPokemonSharpIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}
