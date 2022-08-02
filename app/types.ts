export type AppThemeScheme = "light" | "dark";
export type WithThemeSchemeProp = {
  themeScheme: AppThemeScheme;
};

export interface CommonViewProps {
  themeScheme: AppThemeScheme;
  title?: string;
}

export type CommonProps = { commonProps: CommonViewProps };
