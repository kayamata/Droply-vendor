"use client";

import * as React from "react";

import { customerActions, useCustomerDemo } from "@/features/customer/api";

const TICK_MS = 15_000;

/**
 * Demo courier — advances the active order through the delivery pipeline
 * every 15s until it arrives. Mounted once in CustomerShell so tracking
 * keeps moving while the customer browses.
 */
export function useOrderTicker() {
  const { activeOrder } = useCustomerDemo();

  React.useEffect(() => {
    if (!activeOrder || activeOrder.status === "arrived") return;
    const interval = setInterval(
      () => customerActions.advanceOrderStatus(),
      TICK_MS
    );
    return () => clearInterval(interval);
  }, [activeOrder?.status]); // eslint-disable-line react-hooks/exhaustive-deps
}
