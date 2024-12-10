"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class Scene3DErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Scene error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex items-center justify-center bg-secondary/50">
          <div className="text-center p-4">
            <h3 className="text-lg font-medium mb-2">Unable to load 3D scene</h3>
            <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}