import type { ReactNode, HTMLAttributes, FormEvent } from 'react';
import type { PropertySearchParams } from './api';
import type { AgentInfo, ContactFormData, MarketStatistics } from './domain';

export interface BaseComponentProps {
  readonly className?: string;
  readonly children?: ReactNode;
}

export interface LayoutProps extends BaseComponentProps {
  readonly title?: string;
  readonly description?: string;
  readonly noindex?: boolean;
}

export interface ContactFormProps extends BaseComponentProps {
  readonly onSubmit?: (data: ContactFormData) => Promise<void>;
  readonly initialData?: Partial<ContactFormData>;
  readonly propertyId?: string;
}

export interface PropertyCalculatorProps extends BaseComponentProps {
  readonly defaultLoanAmount?: number;
  readonly defaultInterestRate?: number;
  readonly defaultLoanTerm?: number;
}

export interface RealScoutWidgetProps extends BaseComponentProps {
  readonly searchParams?: PropertySearchParams;
  readonly showFilters?: boolean;
  readonly maxResults?: number;
}

export interface AgentProfileProps extends BaseComponentProps {
  readonly agent: AgentInfo;
  readonly showContact?: boolean;
}

export interface MarketStatsProps extends BaseComponentProps {
  readonly stats: MarketStatistics;
  readonly showTrends?: boolean;
}

export interface SEOHeadProps {
  readonly title: string;
  readonly description: string;
  readonly keywords?: readonly string[];
  readonly canonicalUrl?: string;
  readonly ogImage?: string;
  readonly noindex?: boolean;
  readonly structuredData?: Record<string, unknown>;
}

export interface FormFieldProps extends Omit<HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'onChange'> {
  readonly label: string;
  readonly name: string;
  readonly type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  readonly required?: boolean;
  readonly options?: readonly { value: string; label: string }[];
  readonly error?: string;
  readonly onChange: (value: string) => void;
  readonly value: string;
}

export interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  readonly type?: 'button' | 'submit' | 'reset';
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  readonly size?: 'small' | 'medium' | 'large';
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly onClick?: (event: FormEvent<HTMLButtonElement>) => void;
}
