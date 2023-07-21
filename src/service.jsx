import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const qrCodeApi = createApi({
  reducerPath: "qr_code",
  baseQuery: fetchBaseQuery({ baseUrl: "https://data.phoneo.in/public/api/" }),
  tagTypes:['updateQR'],
  endpoints: (builder) => ({
        GetQRBulk: builder.query({
            query:()=>({
                url:'QRBulk',
                method:'GET'
            }),
            providesTags:["updateQR"]
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

        GetShopList: builder.query({
            query:()=>({
                url:`QRLinkList`,
                method:'GET'
            })
        }),
        UpdateQRById: builder.mutation({
            query: (body) => ({ 
                url:`QR/${body.id}`,
              method: "PUT",
              body:body
            }),
            invalidatesTags:["updateQR"]
          }),

  }),
});


export const {
    useGetQRBulkQuery,
    useGetQRByIdQuery,
    useGetScanLinkQuery,
    useUpdateQRByIdMutation,
    useGetShopListQuery
} = qrCodeApi;
