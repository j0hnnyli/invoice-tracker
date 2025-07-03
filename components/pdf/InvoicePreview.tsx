import { InvoiceType, InvoiceItem } from "@/lib/types/invoiceType";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

Font.register({
  family: 'Playfair',
  fonts: [
    { src: '/fonts/playfair/Play-fair-font.ttf', fontWeight: 'normal' },
    { src: '/fonts/playfair/Playfair-Italic.ttf', fontStyle: 'italic' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
  },
  fontBold: {
    fontWeight : "bold",
  },
  playfair:{
    fontFamily: 'Playfair',
  },
  header: {
    fontSize: 36,
    marginBottom: 75,
  },
  headerText: {
    backgroundColor: '#FFF',
    textAlign: 'left',
  },
  sectionTo: {
    flexDirection: 'row',          
    justifyContent: 'space-between',
    alignItems: 'flex-start',        
    marginBottom: 20, 
    lineHeight: 1,                
  },
  sectionPayTo: {
    lineHeight: 1,   
    marginBottom: 20,              
  },
  invoiceItemSectionHeader : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #000',
    paddingVertical: 8,
    fontWeight: "bold",
  },
  invoiceItems : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  descriptionColumn: {
    width: "50%",
  },
  invoiceItem: {
    textAlign: "center",
    width: "15%"
  },
  sectionNoteAndTotal: {
    flexDirection: 'row',          
    justifyContent: 'space-between',
    alignItems: 'flex-start',        
    marginTop: 20, 
    lineHeight: 1,
    borderTop : '1px solid black',    
    paddingTop: 20,            
  },
  totalSection:{
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    fontWeight: "bold", 
  }
});

type InvoiceDocumentProps = {
  data: Omit<InvoiceType, "closed_at" | "id" | "status" | "user_id">;
  subtotal : string;
};

export default function InvoicePreview({ data, subtotal }: InvoiceDocumentProps) {
  const invoiceItems : InvoiceItem[] = 
  typeof data.invoice_items === "string" 
    ? JSON.parse(data.invoice_items) 
    : data.invoice_items;

  return (
    <Document>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={[styles.header, styles.playfair]}>
          <Text style={styles.headerText}>Invoice</Text>
        </View>
       
        <View style={styles.sectionTo}>
          <View>
            <Text style={styles.fontBold}>Issue To:</Text>
            <Text style={styles.playfair}>{data.client_name}</Text>
            <Text style={styles.playfair}>{data.client_email}</Text>
            <Text style={styles.playfair}>{data.client_address}</Text>
          </View>
          
          <View>
            <Text style={styles.fontBold}>Invoice No. #{data.invoice_number}</Text>
            <Text style={styles.playfair}>Date : {data.created_at && new Intl.DateTimeFormat("en-US", {dateStyle: "long"}).format(new Date(data.created_at))}</Text>
            <Text style={styles.playfair}>
              Due Date:{" "}
              {data.due_date && !isNaN(new Date(data.due_date).getTime())
                ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(data.due_date))
                : ""}
            </Text>          
          </View>
        </View>
        
        <View style={styles.sectionPayTo}>
          <Text style={styles.fontBold}>Pay To:</Text>
          <Text style={styles.playfair}>{data.name}</Text>
          <Text style={styles.playfair}>{data.email}</Text>
          <Text style={styles.playfair}>{data.address}</Text>
        </View>
        
        <View>
          <View style={styles.invoiceItemSectionHeader}>
            <Text style={styles.descriptionColumn}>Description</Text>
            <Text style={styles.invoiceItem}>Rate</Text>
            <Text style={styles.invoiceItem}>Quantity</Text>
            <Text style={styles.invoiceItem}>Amount</Text>
          </View>

          <View>
            {invoiceItems.map((invoice) => (
              <View 
                key={invoice.description}
                style={styles.invoiceItems}
              >
                <Text style={[styles.descriptionColumn, styles.playfair]}>{invoice.description}</Text> 
                <Text style={[styles.invoiceItem, styles.playfair]}>{invoice.quantity}</Text> 
                <Text style={[styles.invoiceItem, styles.playfair]}>{invoice.rate}</Text> 
                <Text style={[styles.invoiceItem, styles.playfair]}>{invoice.amount}</Text> 
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.sectionNoteAndTotal}>
          <View style={styles.descriptionColumn}>
            <Text style={styles.fontBold}>Notes</Text>
            <Text>{data.note}</Text>
          </View>

          <View>
            <View style={styles.totalSection}>
              <Text>Subtotal :</Text> 
              <Text style={styles.playfair}>{subtotal}</Text> 
            </View>
            <View style={styles.totalSection}>
              <Text>Discount :</Text> 
              <Text style={styles.playfair}>{data.discount_type === '$' && data.discount_type} {data.discount_value || '0'} {data.discount_type === '%' && data.discount_type}</Text> 
            </View>
            <View style={styles.totalSection}>
              <Text>Total :</Text> 
              <Text style={styles.playfair}>{data.amount?.toFixed(2)}</Text> 
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
