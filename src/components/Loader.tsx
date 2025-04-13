import { CircularProgress } from "@mui/material";

import { Box } from "@mui/material";

export default function Loader() {
    return (
        <Box data-testid="Loader" sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
        </Box>
    );
}