import { Box } from "@mantine/core";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <Box className="lg:w-4/5 mx-auto text-center py-10">
        &copy; {new Date().getFullYear()}, Company name, all rights reserved.
      </Box>
    </footer>
  );
}
