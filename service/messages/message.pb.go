// Code generated by protoc-gen-go.
// source: message.proto
// DO NOT EDIT!

/*
Package price_messages is a generated protocol buffer package.

It is generated from these files:
	message.proto

It has these top-level messages:
	GetPriceRequest
	GetPriceResponse
*/
package messages

import proto "github.com/golang/protobuf/proto"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = math.Inf

type ResponseType int32

const (
	ResponseType_Success ResponseType = 0
	ResponseType_Error   ResponseType = 1
)

var ResponseType_name = map[int32]string{
	0: "Success",
	1: "Error",
}
var ResponseType_value = map[string]int32{
	"Success": 0,
	"Error":   1,
}

func (x ResponseType) Enum() *ResponseType {
	p := new(ResponseType)
	*p = x
	return p
}
func (x ResponseType) String() string {
	return proto.EnumName(ResponseType_name, int32(x))
}
func (x *ResponseType) UnmarshalJSON(data []byte) error {
	value, err := proto.UnmarshalJSONEnum(ResponseType_value, data, "ResponseType")
	if err != nil {
		return err
	}
	*x = ResponseType(value)
	return nil
}

type GetPriceRequest struct {
	Id               *string `protobuf:"bytes,1,opt,name=id" json:"id,omitempty"`
	Name             *string `protobuf:"bytes,2,req,name=name" json:"name,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *GetPriceRequest) Reset()         { *m = GetPriceRequest{} }
func (m *GetPriceRequest) String() string { return proto.CompactTextString(m) }
func (*GetPriceRequest) ProtoMessage()    {}

func (m *GetPriceRequest) GetId() string {
	if m != nil && m.Id != nil {
		return *m.Id
	}
	return ""
}

func (m *GetPriceRequest) GetName() string {
	if m != nil && m.Name != nil {
		return *m.Name
	}
	return ""
}

type GetPriceResponse struct {
	Id               *string       `protobuf:"bytes,1,req,name=id" json:"id,omitempty"`
	Result           *ResponseType `protobuf:"varint,2,req,name=result,enum=price_messages.ResponseType" json:"result,omitempty"`
	Message          *string       `protobuf:"bytes,3,opt,name=message" json:"message,omitempty"`
	XXX_unrecognized []byte        `json:"-"`
}

func (m *GetPriceResponse) Reset()         { *m = GetPriceResponse{} }
func (m *GetPriceResponse) String() string { return proto.CompactTextString(m) }
func (*GetPriceResponse) ProtoMessage()    {}

func (m *GetPriceResponse) GetId() string {
	if m != nil && m.Id != nil {
		return *m.Id
	}
	return ""
}

func (m *GetPriceResponse) GetResult() ResponseType {
	if m != nil && m.Result != nil {
		return *m.Result
	}
	return ResponseType_Success
}

func (m *GetPriceResponse) GetMessage() string {
	if m != nil && m.Message != nil {
		return *m.Message
	}
	return ""
}

func init() {
	proto.RegisterEnum("price_messages.ResponseType", ResponseType_name, ResponseType_value)
}
