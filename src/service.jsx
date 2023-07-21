import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const qrCodeApi = createApi({
  reducerPath: "qr_code",
  baseQuery: fetchBaseQuery({ baseUrl: "https://data.phoneo.in/public/api/" }),
  endpoints: (builder) => ({
        GetQRBulk: builder.query({
            query:()=>({
                url:'QRBulk',
                method:'GET'
            })
        }),
        GetQRById: builder.query({
            query:(id)=>({
                url:`QR/${id}`,
                method:'GET'
            })
        }),
        GetScanLink: builder.query({
            query:(QPath)=>({
                url:`ScanHit/${QPath}`,
                method:'GET'
            })
        }),
        UpdateQRById: builder.mutation({
            query: (body,id) => ({ 
                url:`QR/${id}`,
              method: "PUT",
              body
            }),
          }),

  }),
});


export const {
    useGetQRBulkQuery,
    useGetQRByIdQuery,
    useGetScanLinkQuery,
    useUpdateQRByIdMutation
} = qrCodeApi;
