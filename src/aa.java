private static GenericRecord convertJsonToAvro(JsonNode jsonNode, Schema schema) {
        GenericRecord avroRecord = new GenericData.Record(schema);
        for (Schema.Field field : schema.getFields()) {
            JsonNode fieldValue = jsonNode.get(field.name());
            if (fieldValue != null) {
                switch (field.schema().getType()) {
                    case STRING:
                        avroRecord.put(field.name(), fieldValue.asText());
                        break;
                    case INT:
                        avroRecord.put(field.name(), fieldValue.asInt());
                        break;
                    case LONG:
                        avroRecord.put(field.name(), fieldValue.asLong());
                        break;
                    case FLOAT:
                        avroRecord.put(field.name(), (float) fieldValue.asDouble());
                        break;
                    case DOUBLE:
                        avroRecord.put(field.name(), fieldValue.asDouble());
                        break;
                    case BOOLEAN:
                        avroRecord.put(field.name(), fieldValue.asBoolean());
                        break;
                    case RECORD:
                        avroRecord.put(field.name(), convertJsonToAvro(fieldValue, field.schema()));
                        break;
                    case ARRAY:
                        avroRecord.put(field.name(), convertJsonArrayToAvro(fieldValue, field.schema()));
                        break;
                    default:
                        throw new IllegalArgumentException("Unsupported Avro type: " + field.schema().getType());
                }
            }
        }
        return avroRecord;
    }

    private static Object convertJsonArrayToAvro(JsonNode jsonArrayNode, Schema schema) {
        GenericData.Array<Object> avroArray = new GenericData.Array<>(jsonArrayNode.size(), schema);
        for (JsonNode jsonArrayElement : jsonArrayNode) {
            avroArray.add(convertJsonToAvro(jsonArrayElement, schema.getElementType()));
        }
        return avroArray;
    }