package bytes

import "encoding/binary"

// Uint64ToBytes uint64转bytes
func Uint64ToBytes(n uint64) []byte {
	bytes := make([]byte, 8)
	binary.BigEndian.PutUint64(bytes, n)
	return bytes
}
